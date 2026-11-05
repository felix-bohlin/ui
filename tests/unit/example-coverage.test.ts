import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import allowlist from "./example-coverage-allowlist.json"

const apis = Object.entries(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
).map(([path, api]) => ({ api, page: api.page ?? path.split("/").at(-2) }))

const sourcesOf = (page?: string) => {
  const dir = join("src/component-examples", page ?? "")
  if (!page || !existsSync(dir)) return []
  return readdirSync(dir)
    .filter((file) => file.endsWith(".astro"))
    .map((file) => readFileSync(join(dir, file), "utf8"))
}

const tagsOf = (component: string, sources: string[]) =>
  sources.flatMap((source) =>
    [...source.matchAll(new RegExp(`<${component}\\b([^>]*?)/?>`, "gs"))].map(
      ([, attributes]) => attributes,
    ),
  )

const hasAttribute = (attributes: string, name: string) =>
  new RegExp(`(^|\\s)${name}(?=[\\s=/>]|$)`).test(attributes)

export const uncovered = (api: ComponentApi, sources: string[]) => {
  const tags = tagsOf(api.component, sources)
  return (api.options ?? []).flatMap((option) => {
    if (!option.prop || option.inherited) return []
    if (option.frameworks && !option.frameworks.includes("astro")) return []
    const name = `${api.component}.${option.prop}`
    if (!tags.some((tag) => hasAttribute(tag, option.prop))) return [name]
    return Object.entries(option.values ?? {})
      .filter(
        ([value, modifier]) =>
          modifier !== null &&
          !tags.some((tag) => tag.includes(`${option.prop}="${value}"`)),
      )
      .map(([value]) => `${name}="${value}"`)
  })
}

const found = apis.flatMap(({ api, page }) =>
  api.source ? uncovered(api, sourcesOf(page)) : [],
)

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

  test("flags a missing prop and a missing value, and skips inherited and other-framework options", () => {
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
        ['<Chip\n  size="large"\n  label="Bug"\n/>'],
      ),
    ).toEqual(['Chip.size="small"', "Chip.variant"])
  })
})
