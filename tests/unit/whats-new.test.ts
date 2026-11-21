import { expect, test } from "vitest"
import { components } from "../../src/utils/components"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import {
  added,
  highlighted,
  notesFor,
  whatsNew,
  whatsNewFor,
} from "../../src/utils/whats-new"

const slugs = new Set(components.map(({ slug }) => slug))
type Notes = Record<string, Parameters<typeof notesFor>[0]>

const unknownKeys = (notes: Notes, pages: Set<string>) =>
  Object.keys(notes).filter((slug) => !pages.has(slug))

const unnoted = (marked: Iterable<string>, notes: Notes) =>
  [...marked].filter((slug) => !Object.hasOwn(notes, slug))

const unmarked = (pages: Iterable<string>, marked: Set<string>) =>
  [...pages].filter((slug) => !marked.has(slug))

const unlinked = (notes: Notes) =>
  Object.entries(notes).flatMap(([slug, entries]) => [
    ...new Set(
      FRAMEWORK_IDS.flatMap((framework) => notesFor(entries, framework))
        .filter((note) => !note.includes('href="#'))
        .map((note) => `${slug}: ${note.slice(0, 80)}`),
    ),
  ])

test("What's new notes are keyed by a component page", () => {
  expect(
    unknownKeys(whatsNew, slugs),
    "key the notes by the slug of src/docs/components/<slug>.astro",
  ).toEqual([])
})

test("highlighted pages have What's new notes", () => {
  expect(
    unnoted(highlighted, whatsNew),
    "add notes for the page, or drop it from highlighted",
  ).toEqual([])
})

test("added pages are highlighted", () => {
  expect(
    unmarked(added, highlighted),
    "add the page to highlighted too, or drop it from added",
  ).toEqual([])
})

test("What's new notes link to the section of the page that documents them", () => {
  expect(
    unlinked(whatsNew),
    'link the change to its section, <a href="#section-id">',
  ).toEqual([])
})

test("reads the notes", () => {
  expect(Object.keys(whatsNew).length).toBeGreaterThan(0)
  expect(
    FRAMEWORK_IDS.flatMap((framework) =>
      Object.keys(whatsNew).flatMap((slug) => whatsNewFor(framework, slug)),
    ).length,
  ).toBeGreaterThan(0)
})

test("the rules flag their samples", () => {
  const linked = 'Themes can set <a href="#api">a token</a>.'
  expect(unknownKeys({ button: [linked], nope: [linked] }, slugs)).toEqual([
    "nope",
  ])
  expect(unnoted(["button", "tabs"], { button: [linked] })).toEqual(["tabs"])
  expect(unmarked(["menu", "toast"], new Set(["menu"]))).toEqual(["toast"])
  expect(unlinked({ button: [linked, "No link here."] })).toEqual([
    "button: No link here.",
  ])
  expect(
    unlinked({ button: [{ astro: "Astro only.", default: linked }] }),
  ).toEqual(["button: Astro only."])
})
