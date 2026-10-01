import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { expect, test } from "vitest"
import { whatsNew } from "../../src/utils/whats-new"

const root = fileURLToPath(new URL("../../", import.meta.url))
const componentsDir = join(root, "packages/opui/components")
const docsDir = join(root, "src/docs/components")

const SECTIONS = ["Added", "Breaking", "Changed"]

const PAGES: Record<string, string> = {
  ClassicSelect: "select",
  FieldDescription: "form",
  FieldGroup: "form",
  FieldLegend: "form",
  FieldSet: "form",
  ListItem: "list",
  ToggleButton: "toggle",
  ToggleGroup: "toggle",
}

const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

const hasPage = (slug: string) => existsSync(join(docsDir, `${slug}.astro`))

const pageFor = (name: string) => {
  const folder = readdirSync(componentsDir).find((folder) =>
    existsSync(join(componentsDir, folder, `${name}.astro`)),
  )
  if (!folder) return kebab(name)
  return PAGES[folder] ?? kebab(folder)
}

const unreleased =
  readFileSync(join(root, "packages/opui/CHANGELOG.md"), "utf-8")
    .split(/^## /m)
    .find((release) => release.startsWith("Unreleased")) ?? ""

const changedComponents = unreleased
  .split(/^### /m)
  .filter((section) => SECTIONS.includes(section.split("\n")[0].trim()))
  .flatMap((section) =>
    [...section.matchAll(/^- `([A-Z]\w*)`/gm)].map((match) => match[1]),
  )

test("every What's new entry is a component page", () => {
  const missing = Object.keys(whatsNew).filter((slug) => !hasPage(slug))

  expect(missing).toEqual([])
})

test("What's new entries are sorted", () => {
  const slugs = Object.keys(whatsNew)

  expect(slugs).toEqual(slugs.toSorted((a, b) => a.localeCompare(b)))
})

test("every component changelog entry maps to a component page", () => {
  const unmapped = changedComponents.filter((name) => !hasPage(pageFor(name)))

  expect(
    unmapped,
    "Add the component to PAGES in tests/unit/whats-new.test.ts",
  ).toEqual([])
})

test("every component in Unreleased Added, Breaking and Changed has What's new notes", () => {
  const missing = [...new Set(changedComponents.map(pageFor))]
    .filter((slug) => !(slug in whatsNew))
    .toSorted()

  expect(
    missing,
    "Add notes for these pages to src/utils/whats-new.ts",
  ).toEqual([])
})
