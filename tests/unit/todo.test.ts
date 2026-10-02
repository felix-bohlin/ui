import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  parseTodo,
  slugify,
  splitInlineCode,
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
            severity: 2,
            status: "",
            text: "Tooltips `never` show",
          },
          {
            line: "- [?] Unscored",
            severity: undefined,
            status: "?",
            text: "Unscored",
          },
        ],
        title: "Bugs",
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
