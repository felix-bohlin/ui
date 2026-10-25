import { readFileSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"
import {
  declaredProperties,
  stripComments,
} from "../../src/utils/package-source"

const sheets = [
  ...readdirSync("packages/opui/css/components").map(
    (file) => `packages/opui/css/components/${file}`,
  ),
  ...readdirSync("packages/opui/core").map(
    (file) => `packages/opui/core/${file}`,
  ),
  "packages/opui/css/theme.css",
].filter((file) => file.endsWith(".css"))

const components = [
  ...readdirSync("packages/opui/css/components").map((file) =>
    file.replace(/\.css$/, ""),
  ),
  "field",
]

const names = new Set(
  sheets.flatMap((file) =>
    declaredProperties(stripComments(readFileSync(file, "utf8"))).filter(
      (name) => /^--(?:_|ui-)[a-z0-9-]+$/.test(name),
    ),
  ),
)

const problem = (name: string) => {
  if (
    /-(height|width)(-|$)/.test(name) &&
    !/(^--_|-)(border|outline)-width$/.test(name) &&
    !name.endsWith("-line-height")
  ) {
    return "use -block-size or -inline-size"
  }
  if (/-space(-|$)/.test(name)) return "use -gap or -padding"
  if (/-(tx|ty)$/.test(name)) return "use -shift-x or -shift-y"
  if (/(^--_|-)dir$/.test(name)) return "use -direction"
  if (name.endsWith("-border-radius")) return "use -radius"
  if (
    name.endsWith("-color") &&
    !/(^--_|-)(bg|text|border|outline)-color$/.test(name)
  ) {
    return "say what the color paints: -bg-color, -text-color or -border-color"
  }
  if (
    name.startsWith("--ui-") &&
    !SUFFIX.test(
      name.replace(/-(x-small|small|large|filled|on-filled|on-raised)$/, ""),
    )
  ) {
    return "end in the property it sets, a value type, -accent, -strength or -lightness"
  }
}

const SUFFIX =
  /-(bg-color|text-color|border-color|size|radius|gap|shadow|padding(-inline|-block)?|font-size|font-weight|line-height|position-area|blur|offset|translate|hover|border-width|accent|on-accent|strength|lightness)$/

test("private and component custom properties follow the suffix rules", () => {
  const checked = [...names].filter(
    (name) =>
      name.startsWith("--_") ||
      components.some((component) => name.startsWith(`--ui-${component}-`)),
  )
  expect(checked.length).toBeGreaterThan(100)
  expect(
    checked
      .map((name) => [name, problem(name)])
      .filter(([, message]) => message)
      .map(([name, message]) => `${name}: ${message}`)
      .toSorted(),
  ).toEqual([])
})
