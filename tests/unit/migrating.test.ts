import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { compiledContent } from "../../packages/opui/MIGRATING.md"
import { parseMigrating } from "../../src/utils/migrating"
import { parseRenames } from "../../src/utils/renames"

const markdown = readFileSync("packages/opui/MIGRATING.md", "utf-8")
const [current] = markdown.split(/^# /m).filter(Boolean)

const unreadRows = (text: string) =>
  parseRenames(text).unparsedRows.map(
    ({ row, section }) => `${section}: ${row.replace(/\s+/g, " ")}`,
  )

test("the release page reads every rename row", () => {
  const sample = [
    "# From 5.x to 6.0",
    "",
    "## Callout",
    "",
    "| Component | Old | New |",
    "| --- | --- | --- |",
    "| Callout | `--_a`, `--_b` | `--_c` in `.ui-outlined` |",
    "| Callout | `--_d` | `--_e` |",
    "| Callout | `--_f` | removed, the severity classes set it |",
  ].join("\n")
  expect(unreadRows(sample)).toEqual([
    "Callout: | Callout | `--_a`, `--_b` | `--_c` in `.ui-outlined` |",
  ])

  expect(
    unreadRows(markdown),
    "the Renames table on the release page leaves these rows out: give each old name its own row, start the New cell with its new name or names, as many as the Old cell has, or with removed",
  ).toEqual([])
})

test("renders one section per h2 of the current version", async () => {
  const { intro, sections, title } = parseMigrating(await compiledContent())

  expect(title).toBe(current.split("\n")[0].trim())
  expect(intro).toContain("<p>")
  expect(sections).toHaveLength(current.match(/^## /gm)?.length ?? 0)
  for (const section of sections) expect(section).toMatch(/^<h2 id="/)
})
