import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import {
  addedComponents,
  changelogSections,
  changesSince,
  dateRelease,
  hasUnreleased,
  releaseDate,
  releaseHeadings,
  sectionsIn,
  unreleasedHeading,
  unreleasedPart,
} from "../../src/utils/changelog-file"

const changelog = [
  "# Changelog",
  "",
  "## 6.0.0 - Unreleased",
  "",
  "### Breaking",
  "",
  "- `Tabs` drop `x`.",
  "",
  "### Added",
  "",
  "- `Menu` component (`.ui-menu`): a menu.",
  "- `Tabs` take a `variant` prop.",
  "  A continuation line.",
  "",
  "## 5.4.3 - 2026-09-18",
  "",
  "### Fixed",
  "",
  "- `Card` is fixed.",
  "",
  "## 5.4.2 - 2026-06-29",
  "",
  "### Removed",
  "",
  "- `Chip` is gone.",
  "",
].join("\n")

test("reads the release headings in file order", () => {
  expect(releaseHeadings(changelog)).toEqual([
    "6.0.0 - Unreleased",
    "5.4.3 - 2026-09-18",
    "5.4.2 - 2026-06-29",
  ])
})

test("reads the date of a released version, matching the whole version", () => {
  expect(releaseDate(changelog, "5.4.3")).toBe("2026-09-18")
  expect(releaseDate(changelog, "6.0.0")).toBe(undefined)
  expect(releaseDate(changelog, "5.4")).toBe(undefined)
  expect(releaseDate(changelog, "5x4x3")).toBe(undefined)
})

test("finds and dates the unreleased version", () => {
  expect(unreleasedHeading("6.0.0")).toBe("## 6.0.0 - Unreleased")
  expect(hasUnreleased(changelog, "6.0.0")).toBe(true)
  expect(hasUnreleased(changelog, "5.4.3")).toBe(false)
  const dated = dateRelease(changelog, "6.0.0", "2026-12-01")
  expect(releaseDate(dated, "6.0.0")).toBe("2026-12-01")
  expect(hasUnreleased(dated, "6.0.0")).toBe(false)
})

test("reads the sections of a version in file order, the newest by default", () => {
  expect(changelogSections(changelog)).toEqual([
    { entries: ["- `Tabs` drop `x`."], title: "Breaking" },
    {
      entries: [
        "- `Menu` component (`.ui-menu`): a menu.",
        "- `Tabs` take a `variant` prop.",
      ],
      title: "Added",
    },
  ])
  expect(changelogSections(changelog, "5.4.3")).toEqual([
    { entries: ["- `Card` is fixed."], title: "Fixed" },
  ])
  expect(changelogSections(changelog, "5.4")).toEqual([])
})

test("counts an Added entry worded as a component", () => {
  expect(addedComponents(changelog, "6.0.0")).toEqual(["Menu"])
})

test("reads what changed since a version and what is unreleased", () => {
  expect(releaseHeadings(changesSince(changelog, "5.4.2"))).toEqual([
    "6.0.0 - Unreleased",
    "5.4.3 - 2026-09-18",
  ])
  expect(
    sectionsIn(changesSince(changelog, "5.4.2")).map(({ title }) => title),
  ).toEqual(["Breaking", "Added", "Fixed"])
  expect(releaseHeadings(unreleasedPart(changelog))).toEqual([
    "6.0.0 - Unreleased",
  ])
  expect(unreleasedPart("# Changelog\n")).toBe("# Changelog\n")
})

test("reads the package changelog", () => {
  const text = readFileSync("packages/opui/CHANGELOG.md", "utf8")
  expect(releaseHeadings(text).length).toBeGreaterThan(1)
  expect(releaseDate(text, "1.0.0")).toMatch(/^\d{4}-\d{2}-\d{2}$/)
})
