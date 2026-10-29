import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import type { CustomProperties } from "../../src/component-api/types"
import { frameworkProps } from "../../src/utils/component-source"
import { PACKAGE_FRAMEWORK_IDS } from "../../src/utils/framework"
import { classNamesIn } from "../../src/utils/package-source"
import released from "./released-api.json"

const changelog = readFileSync("packages/opui/CHANGELOG.md", "utf8")
const unreleased = changelog.slice(
  0,
  changelog.indexOf(`\n## ${released.version} `),
)
const breaking = [
  ...unreleased.matchAll(
    /^### (Breaking|Removed)\n([\s\S]*?)(?=^### |^## |(?![\s\S]))/gm,
  ),
]
  .map((match) => match[2])
  .join("\n")
const entries = breaking.split("\n").filter((line) => line.startsWith("- "))
const native = /^(aria-[a-z]+|command|commandfor|id|interestfor|name|open)$/

const currentProps = (source: string, component: string) =>
  new Set(
    PACKAGE_FRAMEWORK_IDS.flatMap((framework) => [
      ...frameworkProps({ component, source }, framework).keys(),
    ]),
  )

const currentClasses = () =>
  classNamesIn(["packages/opui/css", "packages/opui/core"])

const unloggedProps = (
  props: Record<string, Record<string, string[]>>,
  current: (source: string, component: string) => Set<string>,
  logged: string[],
) =>
  Object.entries(props).flatMap(([source, components]) =>
    Object.entries(components).flatMap(([component, names]) => {
      const kept = current(source, component)
      const isLogged = (prop: string) =>
        logged.some(
          (entry) =>
            entry.includes(`\`${component}\``) &&
            (kept.size === 0 || entry.includes(`\`${prop}\``)),
        )
      return names
        .filter(
          (prop) =>
            !kept.has(prop) &&
            !(kept.size > 0 && native.test(prop)) &&
            !isLogged(prop),
        )
        .map((prop) => `${component} ${prop}`)
    }),
  )

const unloggedClasses = (
  classes: string[],
  current: Set<string>,
  logged: string,
) =>
  classes.filter(
    (name) => !current.has(name) && !logged.includes(`\`${name}\``),
  )

test("released props still exist or are logged as Breaking or Removed", () => {
  expect(
    unloggedProps(released.props, currentProps, entries),
    "removed without a Breaking or Removed entry",
  ).toEqual([])
}, 120_000)

test("released classes still exist or are logged as Breaking or Removed", () => {
  expect(
    unloggedClasses(released.classes, currentClasses(), breaking),
    "removed without a Breaking or Removed entry",
  ).toEqual([])
})

test("the rules flag a prop or class that disappeared without an entry", () => {
  const props = { Button: { Button: ["gone", "id", "size"] } }
  const kept = () => new Set(["size"])
  expect(unloggedProps(props, kept, [])).toEqual(["Button gone"])
  expect(unloggedProps(props, kept, ["- `Button` drops `gone`."])).toEqual([])
  expect(unloggedProps(props, () => new Set(), [])).toEqual([
    "Button gone",
    "Button id",
    "Button size",
  ])
  expect(
    unloggedProps(props, () => new Set(), ["- `Button` is gone."]),
  ).toEqual([])
  const current = new Set([".ui-kept"])
  expect(unloggedClasses([".ui-kept", ".ui-gone"], current, "")).toEqual([
    ".ui-gone",
  ])
  expect(
    unloggedClasses([".ui-gone"], current, "- `.ui-gone` is gone."),
  ).toEqual([])
})

const currentInputs = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: CustomProperties }>(
      "../../src/component-api/custom-properties/*.ts",
      { eager: true },
    ),
  ).map(([file, module]) => [
    file.match(/([^/]+)\.ts$/)![1],
    new Set(
      Object.entries(module.default)
        .filter(([, property]) => property.kind === "input")
        .map(([name]) => name),
    ),
  ]),
)

test.skipIf(released.inputsVersion !== released.version)(
  "released --_ inputs still exist or are logged as Breaking or Removed",
  () => {
    const unlogged = Object.entries(released.inputs).flatMap(([file, names]) =>
      names
        .filter(
          (name) =>
            !currentInputs[file]?.has(name) &&
            !breaking.includes(`\`${name}\``),
        )
        .map((name) => `${file} ${name}`),
    )
    expect(unlogged, "removed without a Breaking or Removed entry").toEqual([])
  },
)

test("the released version is in the CHANGELOG", () => {
  expect(changelog).toContain(`\n## ${released.version} `)
})
