import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import { components } from "../../src/utils/components"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import { migratingAnchor } from "../../src/utils/migrating"
import { classNamesIn } from "../../src/utils/package-source"
import { themeTokens } from "../../src/utils/theme-tokens"
import { whatsNewFor } from "../../src/utils/whats-new"
import releasedApi from "./released-api.json"
import releasedTokens from "./released-tokens.json"

const changelog = readFileSync("packages/opui/CHANGELOG.md", "utf8")
const sectionsOf = (text: string) => {
  const start = text.indexOf("\n## ")
  const end = text.indexOf("\n## ", start + 1)
  const unreleased = text.slice(start, end === -1 ? undefined : end)
  return [
    ...unreleased.matchAll(/^### (\w+)\n([\s\S]*?)(?=^### |(?![\s\S]))/gm),
  ].map(([, title, body]) => ({
    entries: body.split("\n").filter((line) => line.startsWith("- ")),
    title,
  }))
}
const sections = sectionsOf(changelog)

const name = (entry: string) => entry.match(/^- `([^`]+)`/)?.[1]
const tier = (leading: string) => (/^[A-Z]/.test(leading) ? 0 : 1)
const compare = (a: string, b: string) => {
  const [x, y] = [name(a) ?? "", name(b) ?? ""]
  return tier(x) - tier(y) || x.localeCompare(y, "en")
}

const unnamed = (entries: string[]) => entries.filter((entry) => !name(entry))
const SECTIONS = ["Breaking", "Removed", "Added", "Changed", "Fixed"]
const sectionOrder = (text: string) => {
  const titles = sectionsOf(text).map((section) => section.title)
  return titles.join() ===
    SECTIONS.filter((title) => titles.includes(title)).join() &&
    new Set(titles).size === titles.length
    ? []
    : titles
}

describe.each(sections)("$title", ({ entries }) => {
  test("every entry starts with a backticked name", () => {
    expect(
      unnamed(entries),
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
  expect(
    sectionOrder(changelog),
    "Breaking, Removed, Added, Changed and Fixed, in that order and each once",
  ).toEqual([])
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

const migrating = readFileSync("packages/opui/MIGRATING.md", "utf8")

test("Breaking entries have a MIGRATING.md section for each component they start with", () => {
  expect(
    sections
      .filter(({ title }) => title === "Breaking")
      .flatMap(({ entries }) => entries.flatMap(subjects))
      .filter((component, index, all) => all.indexOf(component) === index)
      .filter(
        (component) => !migratingAnchor(migrating, pageOf(component) ?? ""),
      )
      .map((component) => `${component} (${pageOf(component)})`),
    "add a ## section for the page to packages/opui/MIGRATING.md, or map the page to its section in MIGRATING_SECTIONS in src/utils/migrating.ts",
  ).toEqual([])
})

const sinceRelease = (version: string) =>
  changelog.slice(0, changelog.indexOf(`\n## ${version} `))

const namedIn = (text: string) => {
  const names = new Set(
    [...text.matchAll(/`([^`]+)`/g)].flatMap(
      ([, span]) => span.match(/(?:--|\.)[\w-]+/g) ?? [],
    ),
  )
  const ranges = [...text.matchAll(/`([^`]*?)(\d+)` to `\1(\d+)`/g)].map(
    ([, prefix, from, to]) => ({ from: Number(from), prefix, to: Number(to) }),
  )
  return (name: string) =>
    names.has(name) ||
    ranges.some(({ from, prefix, to }) => {
      const step = name.startsWith(prefix) ? name.slice(prefix.length) : ""
      return /^\d+$/.test(step) && Number(step) >= from && Number(step) <= to
    })
}

test("classes added since the last release are named in the CHANGELOG", () => {
  const named = namedIn(sinceRelease(releasedApi.version))
  const released = new Set(releasedApi.classes)
  expect(
    [...classNamesIn(["packages/opui/css", "packages/opui/core"])]
      .filter((name) => !released.has(name) && !named(name))
      .toSorted(),
    "name each class in backticks in an entry of the unreleased version",
  ).toEqual([])
})

test("theme tokens added since the last release are named in the CHANGELOG", () => {
  const text = sinceRelease(releasedTokens.version)
  const named = namedIn(text)
  const released = new Set(releasedTokens.tokens)
  const prefixed = text.includes("`--ui-`")
  expect(
    themeTokens()
      .map((token) => token.name)
      .filter(
        (name) =>
          !released.has(name) &&
          !(prefixed && released.has(`--${name.replace(/^--ui-/, "")}`)) &&
          !named(name),
      )
      .toSorted(),
    "name each token in backticks in an entry of the unreleased version, or a range such as `--ui-space-1` to `--ui-space-8`",
  ).toEqual([])
})

describe("the changelog rules flag their samples", () => {
  const log = (...lines: string[]) =>
    [
      "# Changelog",
      "",
      "## 6.0.0 - Unreleased",
      "",
      ...lines,
      "",
      "## 5.4.3 - 2026-01-01",
      "",
      "### Fixed",
      "",
      "- `Card` is fixed.",
      "",
    ].join("\n")

  test("an entry without a backticked name", () => {
    const [added] = sectionsOf(log("### Added", "", "- Tabs take a variant."))
    expect(unnamed(added.entries)).toEqual(["- Tabs take a variant."])
  })

  test("entries out of order", () => {
    const [added] = sectionsOf(
      log(
        "### Added",
        "",
        "- `theme.css` has a token.",
        "- `Tabs` take a variant.",
      ),
    )
    expect(added.entries.toSorted(compare)).not.toEqual(added.entries)
  })

  test("sections out of order or twice", () => {
    expect(
      sectionOrder(
        log(
          "### Fixed",
          "",
          "- `Card` is fixed.",
          "",
          "### Added",
          "",
          "- `Tabs` take a variant.",
        ),
      ),
    ).toEqual(["Fixed", "Added"])
    expect(
      sectionOrder(
        log("### Added", "", "- `A` b.", "", "### Added", "", "- `C` d."),
      ),
    ).toEqual(["Added", "Added"])
    expect(
      sectionOrder(
        log("### Breaking", "", "- `A` b.", "", "### Fixed", "", "- `C` d."),
      ),
    ).toEqual([])
  })

  test("a heading that is no version with a date or Unreleased", () => {
    expect(
      ["6.0.0 - Unreleased", "5.4.3 - 2026-01-01", "5.4.3"].filter((heading) =>
        HEADING.test(heading),
      ),
    ).toHaveLength(3)
    expect(
      ["Version 6", "6.0 - Unreleased", "6.0.0 - soon"].filter((heading) =>
        HEADING.test(heading),
      ),
    ).toEqual([])
  })

  test("only the unreleased version's sections are read", () => {
    expect(
      sectionsOf(log("### Added", "", "- `Tabs` take a variant.")).map(
        ({ title }) => title,
      ),
    ).toEqual(["Added"])
  })
})
