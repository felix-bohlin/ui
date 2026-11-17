import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { loadChanges, renderChangelog } from "../../scripts/build-changelog.mjs"
import { catalog } from "../../src/component-api/catalog.glob"
import {
  changelogBody,
  changesOf,
  KINDS,
  leadingName,
  pageNotes,
  versionsOf,
  withChanges,
  type Change,
} from "../../src/utils/changes"
import { changes } from "../../src/utils/changes.glob"
import { migratingAnchor } from "../../src/utils/migrating"

const sample = changesOf([
  ["changes/6.1.0/fixed/theme.ts", { entry: "`theme.css` is fixed." }],
  [
    "changes/6.1.0/fixed/tabs-10.ts",
    { entry: "`Tabs` keep their order.", notes: { tabs: "Tenth." } },
  ],
  ["changes/6.1.0/fixed/tabs-2.ts", { entry: "`Tabs` wrap." }],
  [
    "changes/6.1.0/breaking/tabs.ts",
    {
      entry: "`Tabs` drop `x`.",
      migrating: ["tabs"],
      notes: {
        tabs: [
          { default: "Gone.", html: "Gone in HTML." },
          { react: "React only." },
        ],
      },
    },
  ],
  [
    "changes/6.0.0/added/menu.ts",
    { entry: "`Menu` component.", notes: { menu: "Old." } },
  ],
])

test("a record takes its version, kind and name from its path", () => {
  expect(
    sample.map(({ file, kind, version }) => [version, kind, file]),
  ).toEqual([
    ["6.0.0", "added", "menu"],
    ["6.1.0", "breaking", "tabs"],
    ["6.1.0", "fixed", "tabs-2"],
    ["6.1.0", "fixed", "tabs-10"],
    ["6.1.0", "fixed", "theme"],
  ])
  expect(versionsOf(sample)).toEqual(["6.0.0", "6.1.0"])
  expect(leadingName("`Tabs` wrap.")).toBe("Tabs")
})

test("a record in a folder that is no kind is refused", () => {
  expect(() =>
    changesOf([["changes/6.1.0/tweaked/tabs.ts", { entry: "`Tabs`." }]]),
  ).toThrow("tweaked")
})

test("a version renders its kinds in changelog order, components before files", () => {
  expect(changelogBody(sample, "6.1.0")).toBe(
    [
      "### Breaking",
      "",
      "- `Tabs` drop `x`.",
      "",
      "### Fixed",
      "",
      "- `Tabs` wrap.",
      "- `Tabs` keep their order.",
      "- `theme.css` is fixed.",
      "",
    ].join("\n"),
  )
})

test("the rendered sections replace a version's sections and keep its intro", () => {
  const changelog = [
    "# Changelog",
    "",
    "## 6.1.0 - Unreleased",
    "",
    "The highlights.",
    "",
    "### Added",
    "",
    "- `Old` entry.",
    "",
    "## 6.0.0 - 2026-12-01",
    "",
    "### Added",
    "",
    "- `Menu` component.",
    "",
  ].join("\n")
  const rendered = withChanges(changelog, sample, "6.1.0")
  expect(rendered).toContain(
    "## 6.1.0 - Unreleased\n\nThe highlights.\n\n### Breaking\n\n- `Tabs` drop `x`.\n",
  )
  expect(rendered).not.toContain("`Old` entry")
  expect(rendered).toContain(
    "- `theme.css` is fixed.\n\n## 6.0.0 - 2026-12-01\n\n### Added\n\n- `Menu` component.\n",
  )
  expect(renderChangelog(changelog, sample)).toBe(rendered)
  expect(() => withChanges(changelog, sample, "7.0.0")).toThrow("7.0.0")
})

test("a page shows the notes of the newest version, each in its framework's wording", () => {
  expect(pageNotes(sample, "html", "tabs")).toEqual([
    { breaking: true, text: "Gone in HTML." },
    { breaking: false, text: "Tenth." },
  ])
  expect(pageNotes(sample, "react", "tabs")).toEqual([
    { breaking: true, text: "Gone." },
    { breaking: true, text: "React only." },
    { breaking: false, text: "Tenth." },
  ])
  expect(pageNotes(sample, "html", "menu")).toEqual([])
})

test("the CHANGELOG sections are the ones the records render", async () => {
  const changelog = readFileSync("packages/opui/CHANGELOG.md", "utf8")
  expect(
    renderChangelog(changelog, await loadChanges()) === changelog,
    "run pnpm build-changelog and commit packages/opui/CHANGELOG.md",
  ).toBe(true)
})

test("the site and the scripts load the same records", async () => {
  const node = await loadChanges()
  expect(changes.length).toBeGreaterThan(0)
  expect(node.map(({ file, kind, version }) => [version, kind, file])).toEqual(
    changes.map(({ file, kind, version }) => [version, kind, file]),
  )
})

const unnamed = (records: Change[]) =>
  records.filter(({ entry }) => !leadingName(entry)).map(({ entry }) => entry)

const migrating = readFileSync("packages/opui/MIGRATING.md", "utf8")

const unanchored = (records: typeof changes, markdown: string) =>
  records.flatMap(({ file, kind, migrating = [], version }) =>
    migrating
      .filter((anchor) => !migratingAnchor(markdown, anchor))
      .map((anchor) => `changes/${version}/${kind}/${file}.ts: ${anchor}`),
  )

const unpointed = (
  records: typeof changes,
  page: (component: string) => string | undefined,
) =>
  records
    .filter(
      ({ entry, kind, migrating }) =>
        kind === "breaking" &&
        !migrating?.length &&
        /^[A-Z]/.test(leadingName(entry) ?? "") &&
        page(leadingName(entry) ?? ""),
    )
    .map(({ file, kind, version }) => `changes/${version}/${kind}/${file}.ts`)

test("every record's entry starts with a backticked name", () => {
  expect(
    unnamed(changes),
    "start the entry with the component, file or token in backticks: `Tabs` take a `variant` prop.",
  ).toEqual([])
})

test("a record's migrating sections exist in MIGRATING.md", () => {
  expect(
    unanchored(changes, migrating),
    "name the ## section of packages/opui/MIGRATING.md by its anchor, or the page slug that MIGRATING_SECTIONS in src/utils/migrating.ts maps to it",
  ).toEqual([])
})

test("a breaking record that starts with a component points to its MIGRATING.md section", () => {
  expect(
    unpointed(changes, catalog.pageOfComponent),
    "add migrating: [<anchor>] to the record, and the section to packages/opui/MIGRATING.md",
  ).toEqual([])
})

test("the record rules flag their samples", () => {
  expect(unnamed([{ entry: "Tabs take a variant." }])).toEqual([
    "Tabs take a variant.",
  ])
  expect(unanchored(sample, "## Menu\n")).toEqual([
    "changes/6.1.0/breaking/tabs.ts: tabs",
  ])
  expect(unanchored(sample, "## Tabs\n")).toEqual([])
  const [breaking] = changesOf([
    ["changes/6.1.0/breaking/tabs.ts", { entry: "`Tabs` drop `x`." }],
  ])
  expect(unpointed([breaking], () => "tabs")).toEqual([
    "changes/6.1.0/breaking/tabs.ts",
  ])
  expect(unpointed(sample, () => "tabs")).toEqual([])
  expect(KINDS).toEqual(["breaking", "removed", "added", "changed", "fixed"])
})
