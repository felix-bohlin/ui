import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import type { CustomProperties } from "../../src/component-api/types"
import { frameworkProps } from "../../src/utils/component-source"
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
    (["astro", "vue"] as const).flatMap((framework) => [
      ...frameworkProps({ component, source }, framework).keys(),
    ]),
  )

const currentClasses = () =>
  classNamesIn(["packages/opui/css", "packages/opui/core"])

test("released props still exist or are logged as Breaking or Removed", () => {
  const unlogged = Object.entries(released.props).flatMap(
    ([source, components]) =>
      Object.entries(components).flatMap(([component, props]) => {
        const current = currentProps(source, component)
        const logged = (prop: string) =>
          entries.some(
            (entry) =>
              entry.includes(`\`${component}\``) &&
              (current.size === 0 || entry.includes(`\`${prop}\``)),
          )
        return props
          .filter(
            (prop) =>
              !current.has(prop) &&
              !(current.size > 0 && native.test(prop)) &&
              !logged(prop),
          )
          .map((prop) => `${component} ${prop}`)
      }),
  )
  expect(unlogged, "removed without a Breaking or Removed entry").toEqual([])
}, 120_000)

test("released classes still exist or are logged as Breaking or Removed", () => {
  const current = currentClasses()
  const unlogged = released.classes.filter(
    (name) => !current.has(name) && !breaking.includes(`\`${name}\``),
  )
  expect(unlogged, "removed without a Breaking or Removed entry").toEqual([])
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
