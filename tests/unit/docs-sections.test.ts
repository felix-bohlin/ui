import { readdirSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"

const pages = readdirSync("src/docs/components")
  .filter((file) => file.endsWith(".astro"))
  .map((file) => ({
    slug: file.replace(/\.astro$/, ""),
    source: readFileSync(`src/docs/components/${file}`, "utf-8"),
  }))
  .toSorted((a, b) => a.slug.localeCompare(b.slug))

const apis = Object.entries(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
).map(([file, api]) => ({ api, page: api.page ?? file.split("/").at(-2) }))

const items = (source: string, slot: string) =>
  source.match(new RegExp(`<li\\s+slot="${slot}"`, "g"))?.length ?? 0

describe("component pages", () => {
  test.each(pages)("$slug has a Usage section", ({ source }) => {
    expect(source).toContain('<Usage slot="usage">')
    for (const slot of ["when", "when-not"]) {
      expect(items(source, slot), slot).toBeGreaterThanOrEqual(2)
      expect(items(source, slot), slot).toBeLessThanOrEqual(3)
    }
  })

  test.each(pages)("$slug renders its keyboard data", ({ slug, source }) => {
    const keyboards = apis.filter(
      ({ api, page }) => page === slug && api.keyboard,
    )
    expect(keyboards.length).toBeLessThanOrEqual(1)
    expect(source.includes("<KeyboardSupport")).toBe(keyboards.length === 1)
  })

  test.each(pages)(
    "$slug leaves the shared headings to the partials",
    ({ source }) => {
      expect(source).not.toMatch(
        /\bid="(keyboard-support|usage|when-not-to-use|when-to-use)"/,
      )
    },
  )
})
