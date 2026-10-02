import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
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
