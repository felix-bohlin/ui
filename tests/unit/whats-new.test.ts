import { expect, test } from "vitest"
import { components } from "../../src/utils/components"
import { FRAMEWORK_IDS } from "../../src/utils/framework"
import { highlighted, whatsNew, whatsNewFor } from "../../src/utils/whats-new"

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

test("What's new notes link to the section of the page that documents them", () => {
  expect(
    Object.keys(whatsNew).flatMap((slug) => [
      ...new Set(
        FRAMEWORK_IDS.flatMap((framework) => whatsNewFor(framework, slug))
          .filter((note) => !note.includes('href="#'))
          .map((note) => `${slug}: ${note.slice(0, 80)}`),
      ),
    ]),
    'link the change to its section, <a href="#section-id">',
  ).toEqual([])
})
