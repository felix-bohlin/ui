import { describe, expect, test } from "vitest"
import {
  linkText,
  openStageOf,
  outcomeOf,
  pageLinksOf,
  parseChecklist,
  previewOf,
} from "../../src/utils/checklist"

const item = (text: string) => ({ kind: "item" as const, level: 0, text })

describe("outcomeOf", () => {
  test.each([
    ["Done: none ships", { label: "Done", text: "none ships", tone: "done" }],
    [
      "Done in e620cfa8: text buttons",
      { label: "Done in e620cfa8", text: "text buttons", tone: "done" },
    ],
    [
      "Done already: the tests run",
      { label: "Done already", text: "the tests run", tone: "done" },
    ],
    [
      "Fixed: `vue` is `^3.5.2`",
      { label: "Fixed", text: "`vue` is `^3.5.2`", tone: "done" },
    ],
    ["Skipped.", { label: "Skipped", text: "", tone: "skipped" }],
    ["Started: a scan", { label: "Started", text: "a scan", tone: "progress" }],
    [
      "Still open: the console",
      { label: "Still open", text: "the console", tone: "open" },
    ],
    [
      "Update: tag b66be4df",
      { label: "Update", text: "tag b66be4df", tone: "progress" },
    ],
    ["rc.1: fails", { label: "rc.1", text: "fails", tone: "release" }],
    [
      "Explained: the page says so",
      { label: "Explained", text: "the page says so", tone: "progress" },
    ],
    [
      "Fixed with option A: the token",
      { label: "Fixed with option A", text: "the token", tone: "done" },
    ],
    [
      "Removed: no longer true",
      { label: "Removed", text: "no longer true", tone: "skipped" },
    ],
  ])("reads %s", (text, expected) => {
    expect(outcomeOf(text)).toEqual(expected)
  })

  test.each([
    "Done when the tests pass",
    "Updated the README",
    "Limitations: Vue warns",
    "Five target the branch",
    "Still open in Firefox: the tooltip",
    "Replaces: the prose in the guide",
  ])("leaves %s alone", (text) => {
    expect(outcomeOf(text)).toBeUndefined()
  })
})

describe("openStageOf", () => {
  test("an item without outcome notes is still to do", () => {
    expect(openStageOf([item("Check print in Firefox.")])).toBe("todo")
  })

  test("an outcome note means the item is in progress", () => {
    expect(
      openStageOf([item("Measure it."), item("Started: 334.5 KB raw.")]),
    ).toBe("doing")
  })

  test("the last outcome decides whether it was skipped", () => {
    expect(
      openStageOf([
        item("Redirect the old URLs."),
        { kind: "comment", level: 0, text: "skip" },
        item("Skipped."),
      ]),
    ).toBe("skipped")
    expect(openStageOf([item("Skipped."), item("Update: back on.")])).toBe(
      "doing",
    )
  })

  test("nested notes are not outcomes", () => {
    expect(
      openStageOf([
        item("Check it."),
        { kind: "item", level: 1, text: "Done: only part" },
      ]),
    ).toBe("todo")
  })
})

describe("previewOf", () => {
  test("shows the latest outcome", () => {
    expect(
      previewOf([
        item("Read the [page](/html/guide/) again."),
        item("Started: the [guide](/html/guide/)."),
        item("Still open: the console."),
      ]),
    ).toEqual({ label: "Still open", text: "the console.", tone: "open" })
  })

  test("falls back to the first note without its links", () => {
    expect(
      previewOf([
        { kind: "comment", level: 0, text: "do it" },
        item("Read the [page](/html/guide/) again."),
      ]),
    ).toEqual({
      label: undefined,
      text: "Read the page again.",
      tone: undefined,
    })
  })
})

test("linkText keeps the text of each link", () => {
  expect(
    linkText(
      "See [Theming](/html/guide/theming/) and [RELEASING.md](../../RELEASING.md).",
    ),
  ).toBe("See Theming and RELEASING.md.")
})

describe("pageLinksOf", () => {
  test("finds each docs page an item links once, in reading order", () => {
    expect(
      pageLinksOf([
        "[Radio](/html/components/radio/#sizes): dots are centered",
        "Also the [layout stress page](/dev/tests/layout/) and [Radio](/html/components/radio/#sizes).",
      ]),
    ).toEqual([
      { href: "/html/components/radio/#sizes", label: "Radio" },
      { href: "/dev/tests/layout/", label: "layout stress page" },
    ])
  })

  test("leaves out other sites, code and the review pages", () => {
    expect(
      pageLinksOf([
        "See [RELEASING.md](https://github.com/felix-bohlin/ui/blob/main/RELEASING.md), [the CDN](//cdn.example/x.css) and `[code](/html/)`.",
        "Do them on [/dev/checks](/dev/checks/), then [/dev/todo](/dev/todo/) and [/dev/checklist](/dev/checklist/).",
      ]),
    ).toEqual([])
  })
})

test("parseChecklist keys items by headline and marks checked ones done", () => {
  const { intro, sections } = parseChecklist(
    [
      "Before [releasing](../../RELEASING.md).",
      "",
      "## Launch",
      "",
      "- [x] Pick the day",
      "- [ ] Write the post",
      "  - Started: a draft for [the blog](/blog/).",
      "- [ ] Announce it",
    ].join("\n"),
  )

  expect(intro).toEqual([
    "Before [releasing](https://github.com/felix-bohlin/ui/blob/main/RELEASING.md).",
  ])
  expect(
    sections.map((section) => ({
      id: section.id,
      items: section.items.map(({ key, openStage, pages, stage }) => ({
        key,
        openStage,
        pages,
        stage,
      })),
    })),
  ).toEqual([
    {
      id: "launch",
      items: [
        { key: "pick-the-day", openStage: "todo", pages: [], stage: "done" },
        {
          key: "write-the-post",
          openStage: "doing",
          pages: [{ href: "/blog/", label: "the blog" }],
          stage: "doing",
        },
        { key: "announce-it", openStage: "todo", pages: [], stage: "todo" },
      ],
    },
  ])
})
