import { readFileSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"
import {
  declaredProperties,
  stripComments,
} from "../../src/utils/package-source"
import { themeTokens } from "../../src/utils/theme-tokens"

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

const sources = sheets.map((file) => stripComments(readFileSync(file, "utf8")))

const names = new Set(
  sources.flatMap((source) =>
    declaredProperties(source).filter((name) =>
      /^--(?:_|ui-)[a-z0-9-]+$/.test(name),
    ),
  ),
)

const tokens = new Set([
  ...themeTokens().map((token) => token.name),
  ...sources.flatMap((source) => source.match(/--ui-[a-z0-9-]+/g) ?? []),
])

const ON_FILL = /^--ui-((?:[a-z]+-)?)on-([a-z0-9-]+)$/
const ON_FILL_EXCEPTION = "--ui-on-fill"
const SURFACE_CONTEXTS = ["filled", "raised"]

const tokenProblem = (name: string, known: Set<string>) => {
  if (name !== "--ui-contrast" && /-contrast(-|$)/.test(name)) {
    return "never -contrast, which only names the contrast mode (--ui-contrast): the color on a fill is --ui-on-{fill}"
  }
  const [, family, fill] = name.match(ON_FILL) ?? []
  if (!fill || SURFACE_CONTEXTS.includes(fill) || name === ON_FILL_EXCEPTION) {
    return undefined
  }
  const fills = [`--ui-${family}${fill}`, `--ui-${family}surface-${fill}`]
  if (!fills.some((token) => known.has(token))) {
    return `an --ui-on-{fill} token needs ${fills.join(" or ")} to sit on. The one exception is ${ON_FILL_EXCEPTION}, the text on every intent fill kept within --ui-accent-fill-max-lightness, which has no token of its own because each intent is one`
  }
}

const problem = (name: string) => {
  if (
    /(^--_|-)(height|width)(-|$)/.test(name) &&
    !/(^--_|-)(border|outline)-width$/.test(name) &&
    !/(^--_|-)line-height$/.test(name)
  ) {
    return "use -block-size or -inline-size"
  }
  if (/(^--_|-)space(-|$)/.test(name)) return "use -gap or -padding"
  if (/(^--_|-)(tx|ty)$/.test(name)) return "use -shift-x or -shift-y"
  if (/(^--_|-)dir$/.test(name)) return "use -direction"
  if (/(^--_|-)border-radius$/.test(name)) return "use -radius"
  if (name === "--_input-size") return "a control's size is --_size"
  if (
    /(^--_|-)color$/.test(name) &&
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

test.each([
  ["--_height", "use -block-size or -inline-size"],
  ["--_icon-width", "use -block-size or -inline-size"],
  ["--_space", "use -gap or -padding"],
  ["--_tx", "use -shift-x or -shift-y"],
  ["--_dir", "use -direction"],
  ["--_border-radius", "use -radius"],
  ["--_input-size", "a control's size is --_size"],
  [
    "--_color",
    "say what the color paints: -bg-color, -text-color or -border-color",
  ],
  [
    "--ui-card-spacing",
    "end in the property it sets, a value type, -accent, -strength or -lightness",
  ],
])("%s breaks the suffix rules", (name, message) => {
  expect(problem(name)).toBe(message)
})

test.each([
  "--_block-size",
  "--_border-width",
  "--_bg-color",
  "--_gap",
  "--_line-height",
  "--_radius",
  "--_shift-x",
  "--_size",
  "--ui-card-padding",
])("%s follows the suffix rules", (name) => {
  expect(problem(name)).toBeUndefined()
})

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

test("tokens never end in -contrast, and every --ui-on-{fill} has a fill to sit on", () => {
  const checked = [...new Set([...names, ...tokens])].filter((name) =>
    /^--(?:_|ui-)[a-z0-9-]+$/.test(name),
  )
  expect(checked.filter((name) => ON_FILL.test(name)).length).toBeGreaterThan(
    10,
  )
  expect(
    checked
      .map((name) => [name, tokenProblem(name, tokens)])
      .filter(([, message]) => message)
      .map(([name, message]) => `${name}: ${message}`)
      .toSorted(),
  ).toEqual([])
})

test("the token rules catch -contrast and an on-color without a fill", () => {
  const known = new Set([
    "--ui-brand",
    "--ui-palette-tint",
    "--ui-surface-inverse",
  ])
  expect(
    [
      "--ui-border-color-on-raised",
      "--ui-contrast",
      "--ui-on-brand",
      "--ui-on-fill",
      "--ui-on-inverse",
      "--ui-palette-on-tint",
    ].map((name) => tokenProblem(name, known)),
  ).toEqual([undefined, undefined, undefined, undefined, undefined, undefined])
  expect(
    ["--ui-brand-contrast", "--_accent-contrast", "--ui-on-tonal"].map((name) =>
      tokenProblem(name, known),
    ),
  ).toEqual([
    expect.stringContaining("never -contrast"),
    expect.stringContaining("never -contrast"),
    expect.stringContaining("needs --ui-tonal or --ui-surface-tonal"),
  ])
})
