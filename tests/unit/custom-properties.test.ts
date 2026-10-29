import { readdirSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  customProperties,
  declaredCustomProperties,
  pageStylesheets,
} from "../../src/component-api/custom-properties"

const stylesheets = readdirSync("packages/opui/css/components")
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(/\.css$/, ""))
  .toSorted()

const pages = readdirSync("src/docs/components")
  .filter((file) => file.endsWith(".astro"))
  .map((file) => file.replace(/\.astro$/, ""))

describe("component custom properties", () => {
  test.each(stylesheets)(
    "%s.css documents every --_ property it declares",
    (stylesheet) => {
      expect(
        Object.keys(customProperties[stylesheet] ?? {}),
        `document the --_ properties ${stylesheet}.css declares, and only those, with sorted keys`,
      ).toEqual(declaredCustomProperties(stylesheet))
    },
  )

  test("every documented stylesheet exists", () => {
    for (const stylesheet of Object.keys(customProperties)) {
      expect(stylesheets).toContain(stylesheet)
    }
  })

  test("every stylesheet with properties is shown on a page", () => {
    const shown = new Set(pages.flatMap(pageStylesheets))
    for (const stylesheet of stylesheets) {
      if (declaredCustomProperties(stylesheet).length > 0) {
        expect(shown, stylesheet).toContain(stylesheet)
      }
    }
  })
})

test("reads the stylesheets and the pages", () => {
  expect(stylesheets.length).toBeGreaterThan(0)
  expect(pages.length).toBeGreaterThan(0)
})
