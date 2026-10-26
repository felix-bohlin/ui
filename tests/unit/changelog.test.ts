import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import { components } from "../../src/utils/components"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import { whatsNewFor } from "../../src/utils/whats-new"

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
    expect(
      entries.filter((entry) => !name(entry)),
      "start every entry with the component name in backticks: - `Tabs` take a `variant` prop.",
    ).toEqual([])
  })

  test("entries are sorted by their leading name", () => {
    expect(
      entries,
      "sort the entries by their backticked name: components A to Z, then files and tokens (theme.css, normalize.css)",
    ).toEqual(entries.toSorted(compare))
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
  const order =
    "Breaking, Removed, Added, Changed and Fixed, in that order and each once"
  expect(titles, order).toEqual(
    ["Breaking", "Removed", "Added", "Changed", "Fixed"].filter((title) =>
      titles.includes(title),
    ),
  )
  expect(new Set(titles).size, order).toBe(titles.length)
})

const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  {
    eager: true,
    import: "default",
  },
)
const slugs = components.map(({ slug }) => slug)
const PAGES: Record<string, string> = { FieldSet: "form", Link: "typography" }
const pageOf = (component: string) => {
  const [file, api] =
    Object.entries(apis).find(([, entry]) => entry.component === component) ??
    []
  if (api) return api.page ?? file?.split("/").at(-2)
  if (PAGES[component]) return PAGES[component]
  const words = component
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .split("-")
  return words
    .map((_, index) => words.slice(0, words.length - index).join("-"))
    .find((slug) => slugs.includes(slug))
}
const subjects = (entry: string) =>
  [
    ...(entry.match(/^- ((?:`[A-Z]\w*`(?:,? and |, )?)+)/)?.[1] ?? "").matchAll(
      /`(\w+)`/g,
    ),
  ].map(([, component]) => component)
const noted = sections.filter(({ title }) =>
  ["Added", "Breaking", "Changed"].includes(title),
)

test("every component an entry starts with has a docs page", () => {
  expect(
    noted
      .flatMap(({ entries }) => entries.flatMap(subjects))
      .filter((component) => !pageOf(component)),
    "map it to its page in PAGES in tests/unit/changelog.test.ts",
  ).toEqual([])
})

test.each(noted)(
  "$title entries have a What's new note on the page of each component they start with",
  ({ entries, title }) => {
    const breaking = title === "Breaking"
    expect(
      entries.flatMap((entry) =>
        subjects(entry)
          .filter((component) => {
            const slug = pageOf(component) ?? ""
            return !FRAMEWORK_IDS.flatMap((framework) =>
              whatsNewFor(framework, slug),
            ).some((note) => note.startsWith("Breaking:") === breaking)
          })
          .map(
            (component) =>
              `${component} (${pageOf(component)}): ${entry.slice(0, 60)}`,
          ),
      ),
      `add a ${breaking ? "Breaking: " : ""}note for these pages to src/utils/whats-new.ts`,
    ).toEqual([])
  },
)
