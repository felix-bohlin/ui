import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  fixOptions,
  parseTodo,
  plainText,
  replyOf,
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
            component: undefined,
            files: [],
            headline: "Tooltips `never` show",
            line: "- [] (2) Tooltips `never` show",
            notes: [],
            recommended: undefined,
            severity: 2,
            status: "",
            summary: undefined,
            text: "Tooltips `never` show",
          },
          {
            component: undefined,
            files: [],
            headline: "Unscored",
            line: "- [?] Unscored",
            notes: [],
            recommended: undefined,
            severity: undefined,
            status: "?",
            summary: undefined,
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
            component: undefined,
            files: [],
            headline: "Fixed",
            line: "- [x] (3) Fixed",
            notes: [{ kind: "item", level: 0, text: "Note" }],
            recommended: undefined,
            severity: 3,
            status: "x",
            summary: undefined,
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

  test("splits the component and the file references off the headline", () => {
    const [section] = parseTodo(
      [
        "## Bugs",
        "",
        "- [ ] (2) Checkbox, Radio: the label wraps (`packages/opui/css/components/choice.css:12-18`, `src/docs/components/checkbox.astro`)",
        "- [ ] (1) Docs site: dead CSS (`src/layouts/Document.astro:4`, `src/pages/blocks/[block]/preview.astro:35`)",
        "- [ ] (2) Tabs: the pill is off (`layout` Surfaces, `forms` Fields)",
        "- [ ] (3) Carousel in Chromium 141 (the sandbox browser): the button sits outside",
        "- [ ] (4) New components the blocks point to. Each block draws these with its own CSS:",
      ].join("\n"),
    ).sections

    expect(
      section.items.map(({ component, files, headline }) => ({
        component,
        files,
        headline,
      })),
    ).toEqual([
      {
        component: "Checkbox, Radio",
        files: [
          "packages/opui/css/components/choice.css:12-18",
          "src/docs/components/checkbox.astro",
        ],
        headline: "The label wraps",
      },
      {
        component: "Docs site",
        files: [
          "src/layouts/Document.astro:4",
          "src/pages/blocks/[block]/preview.astro:35",
        ],
        headline: "Dead CSS",
      },
      {
        component: "Tabs",
        files: [],
        headline: "The pill is off (`layout` Surfaces, `forms` Fields)",
      },
      {
        component: undefined,
        files: [],
        headline:
          "Carousel in Chromium 141 (the sandbox browser): the button sits outside",
      },
      {
        component: undefined,
        files: [],
        headline:
          "New components the blocks point to. Each block draws these with its own CSS:",
      },
    ])
  })

  test("pulls the summary and the recommendation out of the notes", () => {
    const [section] = parseTodo(
      [
        "## Bugs",
        "",
        "- [ ] (2) List: no role",
        "  - Summary: Safari may read the list as plain text.",
        "  - Recommended: Fix with option B. It follows the no extra ARIA decision.",
        "  - Fix: confirm first.",
        "- [ ] (1) Chip: dot",
        "  - Recommended: Explain further and provide an example",
        "  - Summary: The dot is round.",
        "- [ ] (1) Tabs: pill",
        "  - Recommended: Rewrite it",
        "  - Summary: One.",
        "  - Summary: Two.",
      ].join("\n"),
    ).sections

    expect(
      section.items.map(({ notes, recommended, summary }) => ({
        notes,
        recommended,
        summary,
      })),
    ).toEqual([
      {
        notes: [{ kind: "item", level: 0, text: "Fix: confirm first." }],
        recommended: {
          action: "Fix with option B",
          reason: "It follows the no extra ARIA decision.",
        },
        summary: "Safari may read the list as plain text.",
      },
      {
        notes: [],
        recommended: {
          action: "Explain further and provide an example",
          reason: undefined,
        },
        summary: "The dot is round.",
      },
      {
        notes: [
          { kind: "item", level: 0, text: "Recommended: Rewrite it" },
          { kind: "item", level: 0, text: "Summary: Two." },
        ],
        recommended: undefined,
        summary: "One.",
      },
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

  test("names the group after an options condition", () => {
    expect(
      fixOptions([
        item("Options if a browser fails:"),
        item("A: load a polyfill.", 1),
        item("B: keep the fallback.", 1),
      ]).legend,
    ).toBe("Fix if a browser fails, with")
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

describe("replyOf", () => {
  const notes = (...lines: string[]) =>
    parseTodo(["## Bugs", "- [ ] Item", ...lines].join("\n")).sections[0]
      .items[0].notes

  test("has no state without comments", () => {
    expect(replyOf(notes("  - Fix: a"))).toEqual({
      reply: [],
      state: undefined,
    })
  })

  test("waits when the last note is a comment", () => {
    expect(
      replyOf(
        notes("  - Fix: a", "  > Fix", "  - Fixed: a", "  > Fix", "  > b"),
      ),
    ).toEqual({ reply: ["Fix", "b"], state: "waiting" })
  })

  test("follows up when a note comes after the last comment", () => {
    expect(
      replyOf(notes("  > Explain further", "  > why?", "  - Explained: a")),
    ).toEqual({ reply: ["Explain further", "why?"], state: "follow-up" })
  })
})

describe("slugify", () => {
  test("turns a heading into an id", () => {
    expect(slugify("To check")).toBe("to-check")
  })
})

describe("TODO.md", () => {
  const source = readFileSync("TODO.md", "utf8")
  const { sections } = parseTodo(source)
  const lines = source.split("\n")
  const items = sections.flatMap((section) => section.items)
  const headline = (item: (typeof items)[number]) => item.line.slice(0, 80)

  test("has the sections of the findings format, in order", () => {
    expect(
      [...source.matchAll(/^## (.+)$/gm)].map(([, title]) => title),
    ).toEqual([
      "Accessibility",
      "Bugs",
      "Docs",
      "Limitations",
      "Questions",
      "Suggestions",
      "To check",
    ])
  })

  test("sorts open items by severity, lowest first", () => {
    expect(
      sections.flatMap(({ items, title }) =>
        items
          .filter(
            (item, index) =>
              !item.severity ||
              item.severity > 10 ||
              (items[index - 1]?.severity ?? 0) > item.severity,
          )
          .map((item) => `${title}: ${item.line.slice(0, 80)}`),
      ),
    ).toEqual([])
  })

  test("starts every open item with a Summary and a Recommended note", () => {
    expect(
      items
        .filter((item) => {
          const at = lines.indexOf(item.line)
          return (
            !item.summary ||
            !item.recommended ||
            !lines[at + 1]?.startsWith("  - Summary: ") ||
            !lines[at + 2]?.startsWith("  - Recommended: ") ||
            item.notes.some(
              (note) =>
                note.kind === "item" &&
                /^(Recommended|Summary):/.test(note.text),
            )
          )
        })
        .map(headline),
    ).toEqual([])
  })

  test("keeps each summary to one plain sentence of 140 characters at most", () => {
    expect(
      items
        .filter(({ summary = "" }) => {
          const prose = summary.replace(/`[^`]*`/g, "code")
          const plain = plainText(summary)
          return (
            !prose.endsWith(".") ||
            /[.?!] [A-Z]/.test(prose) ||
            /\b[\w-]+\/[\w./[\]-]*\.\w+|\w\.\w+:\d/.test(plain) ||
            plain.length > 140
          )
        })
        .map((item) => `${headline(item)}: ${item.summary}`),
    ).toEqual([])
  })

  test("letters the options and recommends one of them", () => {
    expect(
      items
        .filter((item) => {
          const { options } = fixOptions(item.notes)
          const action = item.recommended?.action ?? ""
          const marked = options.filter(({ note }) => note === "recommended")
          if (options.length === 0) return action.startsWith("Fix with option")
          return (
            options.map(({ id }) => id).join("") !==
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, options.length) ||
            marked.length > 1 ||
            !options.some(({ id }) => action === `Fix with option ${id}`) ||
            (marked.length === 1 &&
              action !== `Fix with option ${marked[0].id}`)
          )
        })
        .map(headline),
    ).toEqual([])
  })

  test("writes no options inline", () => {
    expect(
      items.flatMap((item) =>
        item.notes
          .filter((note) => fixOptions([note]).options.length > 0)
          .map(
            (note) =>
              `${headline(item)}: ${"text" in note ? note.text : note.code}`,
          ),
      ),
    ).toEqual([])
  })
})
