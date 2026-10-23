import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  fixOptions,
  parseTodo,
  slugify,
  splitInlineCode,
  splitLinks,
  stressRefs,
} from "../../src/utils/todo"

describe("parseTodo", () => {
  test("parses intro, sections and items", () => {
    const { intro, sections } = parseTodo(
      [
        "Severity 1-10.",
        "",
        "## Bugs",
        "",
        "- [] (2) Tooltips `never` show",
        "- [x] (3) Done",
        "- [?] Unscored",
        "",
        "## Docs",
        "",
        "- [x] Done",
      ].join("\n"),
    )

    expect(intro).toEqual(["Severity 1-10."])
    expect(sections).toEqual([
      {
        items: [
          {
            line: "- [] (2) Tooltips `never` show",
            notes: [],
            severity: 2,
            status: "",
            text: "Tooltips `never` show",
          },
          {
            line: "- [?] Unscored",
            notes: [],
            severity: undefined,
            status: "?",
            text: "Unscored",
          },
        ],
        title: "Bugs",
      },
    ])
  })

  test("collects done items separately", () => {
    const { done } = parseTodo(
      ["## Bugs", "", "- [] Open", "- [x] (3) Fixed", "  - Note"].join("\n"),
    )

    expect(done).toEqual([
      {
        items: [
          {
            line: "- [x] (3) Fixed",
            notes: [{ kind: "item", level: 0, text: "Note" }],
            severity: 3,
            status: "x",
            text: "Fixed",
          },
        ],
        title: "Bugs",
      },
    ])
  })

  test("parses indented notes under an item", () => {
    const { sections } = parseTodo(
      [
        "## Bugs",
        "",
        "- [?] (2) Menus run off",
        "  > give a better example",
        "  - Example: a `600px` viewport",
        "    - Nested [link](https://example.com)",
        "    ```css",
        "    .a {",
        "",
        "      b: c;",
        "    }",
        "    ```",
        "  Plain text",
        "",
        "- [] Next",
      ].join("\n"),
    )

    expect(sections[0].items.map((item) => item.notes)).toEqual([
      [
        { kind: "comment", level: 0, text: "give a better example" },
        { kind: "item", level: 0, text: "Example: a `600px` viewport" },
        { kind: "item", level: 1, text: "Nested [link](https://example.com)" },
        { code: ".a {\n\n  b: c;\n}", kind: "code", level: 1 },
        { kind: "text", level: 0, text: "Plain text" },
      ],
      [],
    ])
  })

  test("parses every open item in TODO.md", () => {
    const source = readFileSync("TODO.md", "utf8")
    const open = source.split("\n").filter((line) => /^- \[[^x]?\]/.test(line))
    const { sections } = parseTodo(source)

    expect(sections.flatMap((section) => section.items)).toHaveLength(
      open.length,
    )
  })
})

describe("fixOptions", () => {
  const item = (text: string, level = 0) => ({
    kind: "item" as const,
    level,
    text,
  })
  const summary = (notes: Parameters<typeof fixOptions>[0]) => {
    const { legend, notes: rest, options } = fixOptions(notes)
    return {
      legend,
      notes: rest,
      options: options.map(({ id, note, text, value }) => ({
        id,
        note,
        text,
        value,
      })),
    }
  }

  test("turns an options list into fix options", () => {
    expect(
      fixOptions([
        item("Today: broken"),
        item("Options:"),
        item("A (recommended): use `outline`", 1),
        { code: "a { b: c; }", kind: "code", level: 2 },
        item("B: keep it", 1),
        item("Wording with A"),
      ]),
    ).toEqual({
      legend: "Fix with",
      notes: [item("Today: broken"), item("Wording with A")],
      options: [
        {
          id: "A",
          note: "recommended",
          notes: [{ code: "a { b: c; }", kind: "code", level: 0 }],
          text: "Use `outline`",
          value: "Fix with option A",
        },
        {
          id: "B",
          note: undefined,
          notes: [],
          text: "Keep it",
          value: "Fix with option B",
        },
      ],
    })
  })

  test("numbers options without letters", () => {
    expect(
      fixOptions([
        item("Options:"),
        item("Keep the CSS", 1),
        item("Bring back the class", 1),
      ]).options.map((option) => option.id),
    ).toEqual(["1", "2"])
  })

  test("splits lettered options in a sentence", () => {
    expect(
      summary([
        item(
          'Fix: confirm first. If it fails: A: `List` renders `role="list"` (axe: fine). B: a short note: "add it".',
        ),
      ]),
    ).toEqual({
      legend: "Fix with",
      notes: [item("Fix: confirm first. If it fails:")],
      options: [
        {
          id: "A",
          note: undefined,
          text: '`List` renders `role="list"` (axe: fine)',
          value: "Fix with option A",
        },
        {
          id: "B",
          note: undefined,
          text: 'A short note: "add it"',
          value: "Fix with option B",
        },
      ],
    })
  })

  test("splits inline options", () => {
    expect(
      summary([
        item(
          "Still open: it conflicts. Options: A, keep it, with a test; B, remove it.",
        ),
      ]),
    ).toEqual({
      legend: "Fix with",
      notes: [item("Still open: it conflicts.")],
      options: [
        {
          id: "A",
          note: undefined,
          text: "Keep it, with a test",
          value: "Fix with option A",
        },
        {
          id: "B",
          note: undefined,
          text: "Remove it",
          value: "Fix with option B",
        },
      ],
    })
  })

  test("letters a fix that offers this or that", () => {
    expect(
      summary([item("Fix: add `a, or b` (or c) to Grouped, or drop it.")]),
    ).toEqual({
      legend: "Fix with",
      notes: [],
      options: [
        {
          id: "A",
          note: undefined,
          text: "Add `a, or b` (or c) to Grouped",
          value: "Fix with option A: Add `a, or b` (or c) to Grouped",
        },
        {
          id: "B",
          note: undefined,
          text: "Drop it",
          value: "Fix with option B: Drop it",
        },
      ],
    })
  })

  test("splits a list of unlettered options", () => {
    expect(
      fixOptions([
        item("Still open: Options: keep it, allow pairs (a, b), or drop it."),
      ]).options.map((option) => option.text),
    ).toEqual(["Keep it", "Allow pairs (a, b)", "Drop it"])
  })

  test("names the group after a fix condition", () => {
    const { legend, notes } = fixOptions([
      item("Fix if a browser fails: load a polyfill, or keep the fallback."),
    ])

    expect({ legend, notes }).toEqual({
      legend: "Fix if a browser fails, with",
      notes: [],
    })
  })

  test("uses the latest options", () => {
    expect(
      fixOptions([
        item("Fix: add it, or drop it."),
        item("Still open: Options: keep it, or sort all."),
      ]).options.map((option) => option.text),
    ).toEqual(["Keep it", "Sort all"])
  })

  test("leaves notes without options alone", () => {
    const notes = [
      item("Fix: Keep them, or settle on `color` everywhere?"),
      item("Fixed: added it, or so it seems."),
      item("Fix: one change, or two, or three."),
      { kind: "comment" as const, level: 0, text: "Fix: this, or that" },
    ]

    expect(fixOptions(notes)).toEqual({
      legend: "Fix with",
      notes,
      options: [],
    })
  })
})

describe("splitLinks", () => {
  test("splits markdown links from text", () => {
    expect(splitLinks("see [docs](https://example.com) here")).toEqual([
      { href: undefined, value: "see " },
      { href: "https://example.com", value: "docs" },
      { href: undefined, value: " here" },
    ])
  })
})

describe("splitInlineCode", () => {
  test("marks the parts inside backticks as code", () => {
    expect(splitInlineCode("a `b` c")).toEqual([
      { code: false, value: "a " },
      { code: true, value: "b" },
      { code: false, value: " c" },
    ])
  })
})

describe("stressRefs", () => {
  test("finds stress page sections in brackets", () => {
    expect(
      stressRefs(
        "Menus run off (`menu.css` `--_max-block-size`) (`layout` Surfaces, SidebarLayout, `data-display` Tables, `tests/e2e/a.spec.ts`)",
      ),
    ).toEqual([
      { example: "Surfaces", page: "layout" },
      { example: "SidebarLayout", page: "layout" },
      { example: "Tables", page: "data-display" },
    ])
  })

  test("ignores brackets without sections", () => {
    expect(stressRefs("Avatars shrink (no `flex-shrink: 0`)")).toEqual([])
  })
})

describe("slugify", () => {
  test("turns a heading into an id", () => {
    expect(slugify("To check")).toBe("to-check")
  })
})
