import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { TOKENS } from "../../src/utils/theme-store"

const header = readFileSync(
  new URL("../../src/components/Header.astro", import.meta.url),
  "utf-8",
)

test("Header.astro resets the same tokens as theme-store", () => {
  const list = header.match(/const configItems = \[([^\]]*)\]/)?.[1]
  expect(list).toBeDefined()
  const items = [...list!.matchAll(/"(--[\w-]+)"/g)].map((match) => match[1])
  expect(items.toSorted()).toEqual([...TOKENS].toSorted())
})
