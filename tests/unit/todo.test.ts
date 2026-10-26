import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  carryOver,
  fixOptions,
  parseTodo,
  plainText,
  replyOf,
  slugify,
  splitInlineCode,
  splitLinks,
  stressRefs,
} from "../../src/utils/todo"
import allowlist from "./todo-allowlist.json"

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
            key: "tooltips-never-show",
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
            key: "unscored",
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
            key: "fixed",
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

  test("keys an item on its text before the file references", () => {
    const [section] = parseTodo(
      [
        "## Bugs",
        "",
        "- [ ] (2) Checkbox: the label wraps (`packages/opui/css/components/choice.css:12-18`)",
        "- [ ] (2) Checkbox: the label wraps (`packages/opui/css/components/choice.css:30-36`, `src/docs/components/checkbox.astro`)",
        "- [ ] (2) Tabs: the pill is off (`layout` Surfaces)",
        "- [ ] (2) Layout: the gap collapses (`layout` Surfaces, `packages/opui/css/components/layout.css:12`)",
        "- [ ] (2) Layout: the gap grows (`src/components/{A,B}Build.astro`, `src/utils/learn-posts.ts`)",
      ].join("\n"),
    ).sections

    expect(section.items.map((item) => item.key)).toEqual([
      "checkbox-the-label-wraps",
      "checkbox-the-label-wraps",
      "tabs-the-pill-is-off",
      "layout-the-gap-collapses",
      "layout-the-gap-grows",
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

describe("carryOver", () => {
  test("moves answers saved under an old key to the key it starts with", () => {
    expect(
      carryOver({ "a-b-c-ts-1": "Fix", other: "Remove issue" }, ["a-b", "x"]),
    ).toEqual({ "a-b": "Fix", other: "Remove issue" })
  })

  test("moves an answer saved before a citation was corrected", () => {
    expect(carryOver({ "a-b-c-ts-395-401": "Fix" }, ["a-b", "c"])).toEqual({
      "a-b": "Fix",
    })
  })

  test("picks the longest key the old key starts with", () => {
    expect(carryOver({ "a-b-c-d-ts-1": "Fix" }, ["a-b", "a-b-c"])).toEqual({
      "a-b-c": "Fix",
    })
  })

  test("keeps an answer already saved under the new key", () => {
    expect(
      carryOver({ "a-b": "Fix", "a-b-c-ts-1": "Remove issue" }, ["a-b"]),
    ).toEqual({ "a-b": "Fix" })
  })

  test("returns the saved answers when nothing moves", () => {
    const saved = { "a-b": "Fix", gone: "Fix" }

    expect(carryOver(saved, ["a-b", "a-b-c", "constructor"])).toBe(saved)
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
  const items = sections.flatMap((section) => section.items)
  type Item = (typeof items)[number]
  const headline = (item: Item) => item.line.slice(0, 80)
  const parsed = (text: string) => {
    const todo = parseTodo(text)
    return {
      done: todo.done.flatMap((section) => section.items),
      items: todo.sections.flatMap((section) => section.items),
      lines: text.split("\n"),
      sections: todo.sections,
    }
  }

  const titles = (text: string) =>
    [...text.matchAll(/^## (.+)$/gm)].map(([, title]) => title)

  const unsorted = (text: string) =>
    parsed(text).sections.flatMap(({ items, title }) =>
      items
        .filter(
          (item, index) =>
            !item.severity ||
            item.severity > 10 ||
            (items[index - 1]?.severity ?? 0) > item.severity,
        )
        .map((item) => `${title}: ${item.line.slice(0, 80)}`),
    )

  const sharedKeys = (text: string) => {
    const { done, items } = parsed(text)
    const keys = done.concat(items).map((item) => item.key)
    return keys.filter((key, index) => keys.indexOf(key) !== index)
  }

  const untriaged = (text: string) => {
    const { items, lines } = parsed(text)
    return items
      .filter((item) => {
        const at = lines.indexOf(item.line)
        return (
          !item.summary ||
          !item.recommended ||
          !lines[at + 1]?.startsWith("  - Summary: ") ||
          !lines[at + 2]?.startsWith("  - Recommended: ") ||
          item.notes.some(
            (note) =>
              note.kind === "item" && /^(Recommended|Summary):/.test(note.text),
          )
        )
      })
      .map(headline)
  }

  const longSummaries = (text: string) =>
    parsed(text)
      .items.filter(({ summary = "" }) => {
        const prose = summary.replace(/`[^`]*`/g, "code")
        const plain = plainText(summary)
        return (
          !prose.endsWith(".") ||
          /[.?!] [A-Z]/.test(prose) ||
          /\b[\w-]+\/[\w./[\]-]*\.\w+|\w\.\w+:\d/.test(plain) ||
          plain.length > 140
        )
      })
      .map((item) => `${headline(item)}: ${item.summary}`)

  const badOptions = (text: string) =>
    parsed(text)
      .items.filter((item) => {
        const { options } = fixOptions(item.notes)
        const action = item.recommended?.action ?? ""
        const marked = options.filter(({ note }) => note === "recommended")
        if (options.length === 0) return action.startsWith("Fix with option")
        const fix = action.startsWith("Fix")
        return (
          options.map(({ id }) => id).join("") !==
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, options.length) ||
          marked.length > 1 ||
          (fix &&
            !options.some(({ id }) => action === `Fix with option ${id}`)) ||
          (fix &&
            marked.length === 1 &&
            action !== `Fix with option ${marked[0].id}`)
        )
      })
      .map(headline)

  const inlineOptions = (text: string) =>
    parsed(text).items.flatMap((item) =>
      item.notes
        .filter((note) => fixOptions([note]).options.length > 0)
        .map(
          (note) =>
            `${headline(item)}: ${"text" in note ? note.text : note.code}`,
        ),
    )

  const unresolved = (text: string) =>
    parsed(text)
      .done.filter(
        (item) =>
          !item.notes.some(
            (note) => "text" in note && /^(Fixed|Removed)\b/.test(note.text),
          ),
      )
      .map(headline)

  test("has the sections of the findings format, in order", () => {
    expect(titles(source)).toEqual([
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
    expect(unsorted(source)).toEqual([])
  })

  test("gives every item its own key", () => {
    expect(
      sharedKeys(source),
      "Two items share the text before their file references, which the /todo page keys answers on. Reword one of them",
    ).toEqual([])
  })

  test("starts every open item with a Summary and a Recommended note", () => {
    expect(untriaged(source)).toEqual([])
  })

  test("keeps each summary to one plain sentence of 140 characters at most", () => {
    expect(longSummaries(source)).toEqual([])
  })

  test("letters the options, and a Fix recommends one of them", () => {
    expect(
      badOptions(source),
      "letter the options A, B, C, mark at most one (recommended), and with options recommend Fix with option <id> (the marked one), Remove issue or Explain further",
    ).toEqual([])
  })

  test("writes no options inline", () => {
    expect(inlineOptions(source)).toEqual([])
  })

  test("says how every done item ended", () => {
    expect(
      unresolved(source),
      "add a - Fixed: or - Removed: note to the done item",
    ).toEqual([])
  })

  const AREAS = [
    "API docs",
    "CI",
    "CSS",
    "Changelog",
    "Docs",
    "Docs site",
    "Examples",
    "Learn",
    "Package",
    "Release",
    "Repo",
    "Tests",
    "Tokens",
    "Tooling",
  ]
  const names = new Set([
    ...AREAS,
    ...[
      ...readFileSync("packages/opui/astro/index.ts", "utf8").matchAll(
        /^export \{ default as (\w+) \}/gm,
      ),
    ].map(([, name]) => name),
    ...readdirSync("src/docs/components")
      .filter((file) => file.endsWith(".astro"))
      .flatMap(
        (file) =>
          readFileSync(`src/docs/components/${file}`, "utf8").match(
            /<Fragment\s+slot="title"\s*>(.*?)<\/Fragment\s*>/s,
          )?.[1] ?? [],
      ),
  ])

  const unknownPrefix = (text: string) =>
    parsed(text)
      .items.filter(
        ({ component, text }) =>
          !component?.split(", ").every((name) => names.has(name)) &&
          !allowlist.prefixes.some((prefix) => text.startsWith(prefix)),
      )
      .map(headline)

  test("starts every open item with a component, page or area", () => {
    expect(
      unknownPrefix(source),
      "start the headline with a component, a docs page title or an area from AREAS",
    ).toEqual([])
  })

  const item = (line: string, ...notes: string[]) =>
    [line, ...notes.map((note) => `  - ${note}`)].join("\n")
  const triaged = (line: string, ...notes: string[]) =>
    item(
      line,
      "Summary: The shadow looks wrong.",
      "Recommended: Fix. It is small.",
      ...notes,
    )
  const todo = (...entries: string[]) => `## Bugs\n\n${entries.join("\n")}\n`
  const CLEAN = todo(
    triaged("- [ ] (1) Card: the shadow is off"),
    item(
      "- [ ] (2) Tabs: the line is thin",
      "Summary: The tab line is thin.",
      "Recommended: Fix with option A. It reads the role.",
      "Options:\n    - A (recommended): make it thicker.\n    - B: keep it.",
    ),
    item("- [x] (1) Chip: the dot is gone", "Fixed: it is back."),
  )

  const rules = {
    badOptions,
    inlineOptions,
    longSummaries,
    sharedKeys,
    unknownPrefix,
    unresolved,
    unsorted,
    untriaged,
  }

  test.each(Object.keys(rules) as (keyof typeof rules)[])(
    "the %s rule passes a clean TODO.md",
    (rule) => {
      expect(rules[rule](CLEAN)).toEqual([])
    },
  )

  test.each([
    [
      "badOptions",
      todo(
        item(
          "- [ ] (1) Tabs: the line is thin",
          "Summary: The tab line is thin.",
          "Recommended: Fix. It is small.",
          "Options:\n    - A: make it thicker.\n    - B: keep it.",
        ),
      ),
    ],
    [
      "inlineOptions",
      todo(
        triaged(
          "- [ ] (1) Card: the shadow is off",
          "Still open: it conflicts. Options: A, keep it; B, remove it.",
        ),
      ),
    ],
    [
      "longSummaries",
      todo(
        item(
          "- [ ] (1) Card: the shadow is off",
          "Summary: The shadow is off",
          "Recommended: Fix. It is small.",
        ),
      ),
    ],
    [
      "longSummaries",
      todo(
        item(
          "- [ ] (1) Card: the shadow is off",
          "Summary: The shadow is off. It looks flat.",
          "Recommended: Fix. It is small.",
        ),
      ),
    ],
    [
      "longSummaries",
      todo(
        item(
          "- [ ] (1) Card: the shadow is off",
          "Summary: The shadow in src/card.css is off.",
          "Recommended: Fix. It is small.",
        ),
      ),
    ],
    [
      "longSummaries",
      todo(
        item(
          "- [ ] (1) Card: the shadow is off",
          "Summary: The shadow is off and is off and is off and is off and is off and is off and is off and is off and is off and is off and is off and is off and is off and is off and flat.",
          "Recommended: Fix. It is small.",
        ),
      ),
    ],
    [
      "sharedKeys",
      todo(
        triaged("- [ ] (1) Card: the shadow is off"),
        triaged("- [ ] (1) Card: the shadow is off (`TODO.md:1`)"),
      ),
    ],
    ["unknownPrefix", todo(triaged("- [ ] (1) Nope: the shadow is off"))],
    ["unresolved", todo(item("- [x] (1) Chip: the dot is gone", "Done."))],
    [
      "unsorted",
      todo(
        triaged("- [ ] (2) Card: the shadow is off"),
        triaged("- [ ] (1) Chip: the dot is gone"),
      ),
    ],
    [
      "untriaged",
      todo(item("- [ ] (1) Card: the shadow is off", "Fix: read the role.")),
    ],
  ] as const)("the %s rule flags its sample", (rule, sample) => {
    expect(rules[rule](sample)).not.toEqual([])
  })

  test("the section titles come from the headings", () => {
    expect(titles("Intro\n\n## Bugs\n\n## Docs\n")).toEqual(["Bugs", "Docs"])
  })

  const PATH = /^\/?[\w@.[\]-]+(?:\/[\w@.[\]-]*)*(?::[\d,-]+)?$/
  const looksCited = (code: string) =>
    PATH.test(code) && /\/|\.\w+(?::|$)|:\d/.test(code)

  const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean)

  const lineCount = (path: string) =>
    readFileSync(path, "utf8").trimEnd().split("\n").length

  const fitsLines = (lines: string, count: number) =>
    lines.split(",").every((range) => {
      const [start, end = start] = range.split("-").map(Number)
      return (
        /^\d+(-\d+)?$/.test(range) && start >= 1 && start <= end && end <= count
      )
    })

  const citationProblem = (entry: string) => {
    const [path, lines] = entry.split(":")
    if (path.startsWith("/") || /(^|\/)\.\.?\//.test(path)) {
      return "cite it from the repo root"
    }
    if (!existsSync(path)) return "doesn't exist from the repo root"
    if (lines === undefined) return
    if (!statSync(path).isFile()) return "is a folder, cite no lines"
    const count = lineCount(path)
    if (!fitsLines(lines, count)) {
      return `cites lines outside the file's 1-${count}`
    }
  }

  const mentionProblem = (entry: string) => {
    const [name, lines] = entry.split(":")
    if (name.includes("/")) return citationProblem(entry)
    const files = tracked.filter(
      (file) => file === name || file.endsWith(`/${name}`),
    )
    if (!files.length) return "matches no file"
    if (!files.some((file) => fitsLines(lines, lineCount(file)))) {
      return `cites lines outside ${files.join(" and ")}`
    }
  }

  const citationProblems = (text: string) => {
    const group = text.match(/ \(([^()]+)\)$/)
    const entries = group?.[1].split(", ") ?? []
    const codes = (part: string) =>
      [...part.matchAll(/`([^`]+)`/g)].map(([, code]) => code)
    const malformed = entries.filter(
      (entry) => codes(entry).some(looksCited) && !/^`[^`]+`$/.test(entry),
    )
    const closing = entries.flatMap((entry) =>
      /^`[^`]+`$/.test(entry) ? codes(entry).filter(looksCited) : [],
    )
    const inline = codes(group ? text.slice(0, group.index) : text).filter(
      (code) => looksCited(code) && /:\d/.test(code),
    )
    return [
      ...malformed.map(
        (entry) =>
          `${entry} in the file references: wrap each file in backticks and separate them with ", "`,
      ),
      ...closing.flatMap((entry) => {
        const found = citationProblem(entry)
        return found ? [`${entry} ${found}`] : []
      }),
      ...inline.flatMap((entry) => {
        const found = mentionProblem(entry)
        return found ? [`${entry} ${found}`] : []
      }),
    ]
  }

  test("cites files from the repo root, with lines inside them", () => {
    expect(
      items.flatMap((item) =>
        citationProblems(item.text)
          .filter(
            (problem) =>
              !allowlist.citations.some((entry) =>
                problem.startsWith(`${entry} `),
              ),
          )
          .map((problem) => `${headline(item)}: ${problem}`),
      ),
      "cite each file from the repo root with lines inside it, `path/to/file.css:12-18` or `AGENTS.md:9`. Correct a stale citation in place: the /todo page keys answers on the text before the file references",
    ).toEqual([])
  })

  test("the citation check finds a bare file name at the repo root", () => {
    expect(citationProblems("A: see `RELEASING.md:1` and `TODO.md:2`")).toEqual(
      [],
    )
  })

  test("the citation check reads every form of citation", () => {
    expect(
      citationProblems(
        "A: see `AGENTS.md:1`, `src/nope.ts:3`, `nope.css:1` and `carousel.css:99999` (`/etc/hosts`, `../AGENTS.md`, `TODO.md:0`, `src`, `src:2`)",
      ),
    ).toEqual([
      "/etc/hosts cite it from the repo root",
      "../AGENTS.md cite it from the repo root",
      "TODO.md:0 cites lines outside the file's 1-" +
        readFileSync("TODO.md", "utf8").trimEnd().split("\n").length,
      "src:2 is a folder, cite no lines",
      "src/nope.ts:3 doesn't exist from the repo root",
      "nope.css:1 matches no file",
      "carousel.css:99999 cites lines outside packages/opui/css/components/carousel.css",
    ])
    expect(
      citationProblems("A: b (`AGENTS.md:1`; `TODO.md:2`, `layout` Surfaces)"),
    ).toEqual([
      '`AGENTS.md:1`; `TODO.md:2` in the file references: wrap each file in backticks and separate them with ", "',
    ])
  })

  test("the allowlist only lists open problems", () => {
    expect(
      [
        ...allowlist.citations.filter(
          (citation) =>
            !items.some(({ text }) => text.includes(`\`${citation}\``)),
        ),
        ...allowlist.prefixes.filter(
          (prefix) => !items.some(({ text }) => text.startsWith(prefix)),
        ),
      ],
      "fixed, remove from tests/unit/todo-allowlist.json",
    ).toEqual([])
  })
})
