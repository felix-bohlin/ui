import { expect, test } from "vitest"
import { components } from "../../src/utils/components"
import { highlighted, whatsNew } from "../../src/utils/whats-new"

const slugs = new Set(components.map(({ slug }) => slug))

test("What's new notes are keyed by a component page", () => {
  expect(
    Object.keys(whatsNew).filter((slug) => !slugs.has(slug)),
    "key the notes by the slug of src/docs/components/<slug>.astro",
  ).toEqual([])
})

test("highlighted pages have What's new notes", () => {
  expect(
    [...highlighted].filter((slug) => !Object.hasOwn(whatsNew, slug)),
    "add notes for the page, or drop it from highlighted",
  ).toEqual([])
})
