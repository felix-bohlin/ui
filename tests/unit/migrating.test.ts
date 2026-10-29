import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { compiledContent } from "../../packages/opui/MIGRATING.md"
import { parseMigrating } from "../../src/utils/migrating"

const markdown = readFileSync("packages/opui/MIGRATING.md", "utf-8")
const [current] = markdown.split(/^# /m).filter(Boolean)

test("renders one section per h2 of the current version", async () => {
  const { intro, sections, title } = parseMigrating(await compiledContent())

  expect(title).toBe(current.split("\n")[0].trim())
  expect(intro).toContain("<p>")
  expect(sections).toHaveLength(current.match(/^## /gm)?.length ?? 0)
  for (const section of sections) expect(section).toMatch(/^<h2 id="/)
})
