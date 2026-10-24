import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"

const changelog = readFileSync("packages/opui/CHANGELOG.md", "utf8")
const start = changelog.indexOf("\n## ")
const end = changelog.indexOf("\n## ", start + 1)
const unreleased = changelog.slice(start, end === -1 ? undefined : end)
const sections = [
  ...unreleased.matchAll(/^### (\w+)\n([\s\S]*?)(?=^### |(?![\s\S]))/gm),
].map(([, title, body]) => ({
  entries: body.split("\n").filter((line) => line.startsWith("- ")),
  title,
}))

const name = (entry: string) => entry.match(/^- `([^`]+)`/)?.[1]
const tier = (leading: string) => (/^[A-Z]/.test(leading) ? 0 : 1)
const compare = (a: string, b: string) => {
  const [x, y] = [name(a) ?? "", name(b) ?? ""]
  return tier(x) - tier(y) || x.localeCompare(y, "en")
}

describe.each(sections)("$title", ({ entries }) => {
  test("every entry starts with a backticked name", () => {
    expect(entries.filter((entry) => !name(entry))).toEqual([])
  })

  test("entries are sorted by their leading name", () => {
    expect(entries).toEqual(entries.toSorted(compare))
  })
})

test("the unreleased version has sections", () => {
  expect(sections.map((section) => section.title)).toEqual(
    expect.arrayContaining(["Breaking", "Added"]),
  )
})
