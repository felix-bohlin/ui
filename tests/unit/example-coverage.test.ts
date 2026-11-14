import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import { componentUsages, type ComponentUsage } from "./component-usage"
import allowlist from "./example-coverage-allowlist.json"

const apis = Object.entries(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
).map(([path, api]) => ({ api, page: api.page ?? path.split("/").at(-2) }))

const usagesOf = async (sources: string[]) =>
  (await Promise.all(sources.map(componentUsages))).flat()

const examplesOf = (page?: string) => {
  const dir = join("src/component-examples", page ?? "")
  if (!page || !existsSync(dir)) return []
  return readdirSync(dir)
    .filter((file) => file.endsWith(".astro"))
    .map((file) => readFileSync(join(dir, file), "utf8"))
}

const NAMES = ["aria-label", "aria-labelledby"]

const namesOf = (prop: string) => (NAMES.includes(prop) ? NAMES : [prop])

export const uncovered = (api: ComponentApi, usages: ComponentUsage[]) => {
  const props = usages
    .filter((usage) => usage.component === api.component)
    .flatMap((usage) => usage.props)
  return (api.options ?? []).flatMap((option) => {
    if (!option.prop || option.inherited) return []
    if (option.frameworks && !option.frameworks.includes("astro")) return []
    const name = `${api.component}.${option.prop}`
    const names = namesOf(option.prop)
    if (!props.some((prop) => names.includes(prop.name))) return [name]
    return Object.entries(option.values ?? {})
      .filter(
        ([value, modifier]) =>
          modifier !== null &&
          !props.some(
            (prop) => prop.name === option.prop && prop.value === value,
          ),
      )
      .map(([value]) => `${name}="${value}"`)
  })
}

const found = (
  await Promise.all(
    apis.map(async ({ api, page }) =>
      api.source ? uncovered(api, await usagesOf(examplesOf(page))) : [],
    ),
  )
).flat()

describe("example coverage", () => {
  test("every documented prop and value appears in an Astro example on its page", () => {
    expect(
      found.filter((name) => !(name in allowlist)),
      "show the prop or value in an example in src/component-examples/<page>/, so readers see what it does",
    ).toEqual([])
  })

  test("the allowlist only lists props and values no example shows, sorted", () => {
    expect(
      Object.keys(allowlist).filter((name) => !found.includes(name)),
      "an example shows these now: remove them from tests/unit/example-coverage-allowlist.json",
    ).toEqual([])
    expect(Object.keys(allowlist)).toEqual(Object.keys(allowlist).toSorted())
  })

  test("flags a missing prop and a missing value, counts aria-label for aria-labelledby, skips inherited and other-framework options, and ignores names and values inside other attributes and on other components", async () => {
    expect(
      uncovered(
        {
          component: "Chip",
          options: [
            {
              description: "",
              group: "Sizes",
              prop: "size",
              values: { large: ".ui-large", medium: null, small: ".ui-small" },
            },
            { description: "", group: "Variants", prop: "variant" },
            { description: "", prop: "aria-labelledby" },
            {
              description: "",
              group: "State",
              inherited: true,
              prop: "disabled",
            },
            {
              description: "",
              frameworks: ["react"],
              group: "Behavior",
              prop: "onValueChange",
            },
          ],
        } as ComponentApi,
        await usagesOf([
          '<Chip\n  size="large"\n  aria-label="Bug"\n/>',
          `<Chip description='Pick a variant for > the size="small" chip' data-size="small" />`,
          '<ChipGroup size="small" variant="outlined" />',
        ]),
      ),
    ).toEqual(['Chip.size="small"', "Chip.variant"])
  })
})
