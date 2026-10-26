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

const headings = [...changelog.matchAll(/^## (.+)$/gm)].map(([, text]) => text)
const HEADING = /^(\d+)\.(\d+)\.(\d+)(?: - (?:\d{4}-\d{2}-\d{2}|Unreleased))?$/

test("every release heading is a version with a date or Unreleased", () => {
  expect(headings.filter((heading) => !HEADING.test(heading))).toEqual([])
})

test("only the newest release is unreleased", () => {
  expect(
    headings.slice(1).filter((heading) => heading.endsWith(" - Unreleased")),
  ).toEqual([])
})

test("the newest release is the package version", () => {
  const { version } = JSON.parse(
    readFileSync("packages/opui/package.json", "utf8"),
  )
  expect(headings[0]?.split(" ")[0]).toBe(version.split("-")[0])
})

test("releases go from newest to oldest", () => {
  const versions = headings.map((heading) =>
    (heading.match(HEADING) ?? []).slice(1, 4).map(Number),
  )
  const newer = (a: number[], b: number[]) =>
    a[0] - b[0] || a[1] - b[1] || a[2] - b[2]
  expect(
    headings.filter(
      (_, index) =>
        index > 0 && newer(versions[index - 1], versions[index]) <= 0,
    ),
  ).toEqual([])
})

test("the unreleased sections come in order", () => {
  const titles = sections.map((section) => section.title)
  expect(titles).toEqual(
    ["Breaking", "Removed", "Added", "Changed", "Fixed"].filter((title) =>
      titles.includes(title),
    ),
  )
  expect(new Set(titles).size).toBe(titles.length)
})
