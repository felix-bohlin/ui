import { readdirSync } from "node:fs"
import { expect, test } from "vitest"
import { guideSlugs } from "../../src/utils/guide"

test("the guide order lists every page in src/docs/guide once", () => {
  const files = readdirSync("src/docs/guide")
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.replace(/\.astro$/, ""))

  expect(guideSlugs.toSorted()).toEqual(
    ["getting-started", ...files].toSorted(),
  )
})
