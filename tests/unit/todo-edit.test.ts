import { spawnSync } from "node:child_process"
import { describe, expect, test } from "vitest"
import { fixOptions, parseTodo } from "../../src/utils/todo"
import {
  addFindings,
  applyAnswers,
  listItems,
  parseAnswers,
  resolveItems,
  sortItems,
  triageItems,
} from "../../src/utils/todo-edit"

const todo = [
  "Intro.",
  "",
  "## Bugs",
  "",
  "- [ ] (1) Card: the shadow on elevated cards is off in dark mode (`packages/opui/css/components/card.css:4`)",
  "  - Summary: The card shadow looks wrong.",
  "  - Recommended: Fix. The change is small.",
  "- [x] (2) Chip: the dot is gone",
  "  - Fixed: the dot is back.",
  "- [ ] (3) Tabs: the line is thin",
  "  - Summary: The tab line is too thin.",
  "  - Recommended: Fix with option A. It reads the role.",
  "  - Options:",
  "    - A (recommended): make it thicker.",
  "    - B: keep it.",
  "",
  "## Docs",
  "",
  "- [ ] (2) Docs: the intro is long",
  "  - Summary: The intro is long.",
  "  - Recommended: Explain further. It is a question of taste.",
  "",
].join("\n")

const answers = (...lines: string[]) =>
  ["TODO.md with my comments", "", "## Bugs", "", ...lines].join("\n")

describe("listItems", () => {
  test("lists the open items with their triage and options", () => {
    const items = listItems(todo)
    expect(items.map(({ section, severity }) => [section, severity])).toEqual([
      ["Bugs", 1],
      ["Bugs", 3],
      ["Docs", 2],
    ])
    expect(items[1].options.map(({ id }) => id)).toEqual(["A", "B"])
    expect(listItems(todo, { missingTriage: true })).toEqual([])
  })
})

describe("parseAnswers", () => {
  test("splits the action from the comment", () => {
    expect(
      parseAnswers(
        answers(
          "- [ ] (3) Tabs: the line is thin",
          "  > Fix with option B",
          "  > Keep it, it matches the design.",
        ),
      ),
    ).toEqual([
      {
        action: "Fix with option",
        answer: [
          "  > Fix with option B",
          "  > Keep it, it matches the design.",
        ],
        comment: "Keep it, it matches the design.",
        line: "- [ ] (3) Tabs: the line is thin",
        option: "B",
        section: "Bugs",
      },
    ])
  })
})

describe("applyAnswers", () => {
  const text = answers(
    "- [ ] (3) Tabs: the line is thin",
    "  > Fix",
    "  > Make it 2px.",
  )

  test("appends the answer word for word after the item's notes", () => {
    const { report, source } = applyAnswers(todo, text)
    expect(report.map(({ status }) => status)).toEqual(["added"])
    expect(source.split("\n").slice(9, 16)).toEqual([
      "- [ ] (3) Tabs: the line is thin",
      "  - Summary: The tab line is too thin.",
      "  - Recommended: Fix with option A. It reads the role.",
      "  - Options:",
      "    - A (recommended): make it thicker.",
      "    - B: keep it.",
      "  > Fix",
    ])
  })

  test("leaves an answer that is already the last one alone", () => {
    const once = applyAnswers(todo, text).source
    const twice = applyAnswers(once, text)
    expect(twice.source).toBe(once)
    expect(twice.report.map(({ status }) => status)).toEqual(["already"])
  })

  test("finds an item whose line changed after the first 80 characters", () => {
    const line =
      "- [ ] (1) Card: the shadow on elevated cards is off in dark mode (`packages/opui/css/components/card.css:4`)"
    const { report } = applyAnswers(
      todo,
      answers(`${line.slice(0, 80)} (changed)`, "  > Fix"),
    )
    expect(report.map(({ line, status }) => [line, status])).toEqual([
      [line, "added"],
    ])
  })

  test("finds an item whose file references were corrected", () => {
    const { report } = applyAnswers(
      todo,
      answers(
        "- [ ] (3) Tabs: the line is thin (`packages/opui/css/components/tabs.css:9`)",
        "  > Fix",
      ),
    )
    expect(report.map(({ line, status }) => [line, status])).toEqual([
      ["- [ ] (3) Tabs: the line is thin", "added"],
    ])
  })

  test("reports answers that match no item", () => {
    const { report, source } = applyAnswers(
      todo,
      answers("- [ ] (1) Card: something else entirely", "  > Fix"),
    )
    expect(report.map(({ status }) => status)).toEqual(["missing"])
    expect(source).toBe(todo)
  })
})

describe("resolveItems", () => {
  test("marks fixed and removed items done and adds the note", () => {
    const { source } = resolveItems(todo, [
      {
        line: "- [ ] (1) Card: the shadow on elevated",
        note: "the shadow reads --ui-shadow-surface.",
        outcome: "fixed",
      },
      {
        line: "- [ ] (2) Docs: the intro is long",
        note: "it's two sentences now.",
        outcome: "explained",
      },
    ])
    const { done, sections } = parseTodo(source)
    expect(done.flatMap(({ items }) => items).map(({ text }) => text)).toEqual([
      "Card: the shadow on elevated cards is off in dark mode (`packages/opui/css/components/card.css:4`)",
      "Chip: the dot is gone",
    ])
    expect(source).toContain("  - Fixed: the shadow reads --ui-shadow-surface.")
    expect(sections.at(-1)!.items[0].notes.at(-1)).toEqual({
      kind: "item",
      level: 0,
      text: "Explained: it's two sentences now.",
    })
  })

  test("leaves a choice open with options and a new recommendation", () => {
    const { source } = resolveItems(todo, [
      {
        line: "- [ ] (1) Card: the shadow on elevated",
        note: "two ways to fix it.",
        options: [
          { id: "A", text: "read --ui-shadow-surface." },
          { id: "B", recommended: true, text: "drop the shadow in dark mode." },
        ],
        outcome: "still-open",
        recommended: "Fix with option B. It matches the other cards.",
      },
    ])
    const [card] = parseTodo(source).sections[0].items
    expect(card.recommended).toEqual({
      action: "Fix with option B",
      reason: "It matches the other cards.",
    })
    expect(fixOptions(card.notes).options.map(({ id }) => id)).toEqual([
      "A",
      "B",
    ])
    expect(source).toContain(
      "  - Still open: two ways to fix it.\n  - Options:\n    - A: read --ui-shadow-surface.\n    - B (recommended): drop the shadow in dark mode.",
    )
  })

  test("rejects options on a done or already optioned item", () => {
    const options = [{ id: "A", text: "x." }]
    expect(() =>
      resolveItems(todo, [
        {
          line: "- [ ] (1) Card: the shadow on elevated",
          note: "x",
          options,
          outcome: "fixed",
        },
      ]),
    ).toThrow("only an explained or still-open item takes options")
    expect(() =>
      resolveItems(todo, [
        {
          line: "- [ ] (3) Tabs: the line is thin",
          note: "x",
          options,
          outcome: "still-open",
        },
      ]),
    ).toThrow("it already has an Options list")
    expect(() =>
      resolveItems(todo, [
        {
          line: "- [ ] (3) Tabs: the line is thin",
          note: "x",
          outcome: "explained",
          recommended: "Fix with option C",
        },
      ]),
    ).toThrow("recommended names option C, which the item lacks")
  })

  test("rejects an unknown item or outcome", () => {
    expect(() =>
      resolveItems(todo, [
        { line: "- [ ] (9) Nope", note: "x", outcome: "fixed" },
      ]),
    ).toThrow("No item matches")
    expect(() =>
      resolveItems(todo, [
        {
          line: "- [ ] (2) Docs: the intro is long",
          note: "x",
          outcome: "done" as "fixed",
        },
      ]),
    ).toThrow('Unknown outcome "done"')
  })
})

describe("addFindings", () => {
  const finding = {
    component: "Tabs",
    files: ["packages/opui/css/components/tabs.css:12"],
    options: [
      { id: "A", recommended: true, text: "read the role." },
      { id: "B", text: "keep the literal." },
    ],
    recommended: "Fix with option A. It follows the roles.",
    section: "Bugs",
    severity: 2,
    summary: "The tab indicator ignores the theme.",
    text: "the indicator color is a literal",
  }

  test("formats a finding and puts it after the items of the same or a lower severity", () => {
    const { source } = addFindings(todo, [finding])
    const [bugs] = parseTodo(source).sections
    expect(bugs.items.map(({ severity }) => severity)).toEqual([1, 2, 3])
    const added = bugs.items[1]
    expect(added.line).toBe(
      "- [ ] (2) Tabs: the indicator color is a literal (`packages/opui/css/components/tabs.css:12`)",
    )
    expect(added.summary).toBe(finding.summary)
    expect(added.recommended).toEqual({
      action: "Fix with option A",
      reason: "It follows the roles.",
    })
    expect(fixOptions(added.notes).options.map(({ id }) => id)).toEqual([
      "A",
      "B",
    ])
  })

  test("indents the code blocks of a fix and its options", () => {
    const code = "```css\n.ui-tabs {\n  color: var(--ui-text-strong);\n}\n```"
    const { source } = addFindings(todo, [
      {
        ...finding,
        fix: `confirm it on the Basics example.\n${code}`,
        options: [
          { id: "A", recommended: true, text: `read the role.\n${code}` },
          { id: "B", text: "keep the literal." },
        ],
      },
    ])
    const [bugs] = parseTodo(source).sections
    const { notes } = bugs.items[1]
    expect(notes.filter(({ kind }) => kind === "code")).toHaveLength(2)
    expect(source).toContain(
      "  - Fix: confirm it on the Basics example.\n    ```css\n    .ui-tabs {\n      color: var(--ui-text-strong);\n    }\n    ```\n  - Options:\n    - A (recommended): read the role.\n      ```css",
    )
    expect(fixOptions(notes).options.map(({ id }) => id)).toEqual(["A", "B"])
  })

  test("rejects a finding the page can't show", () => {
    expect(() =>
      addFindings(todo, [
        { ...finding, section: "Ideas", severity: 11, summary: "" },
      ]),
    ).toThrow(/section must be one of.*severity must be.*summary is required/)
    expect(() =>
      addFindings(todo, [{ ...finding, recommended: "Fix with option C" }]),
    ).toThrow("recommended names option C, which options lacks")
    expect(() =>
      addFindings(todo, [{ ...finding, section: "Docs" }]),
    ).not.toThrow()
    expect(() =>
      addFindings(todo, [{ ...finding, section: "Questions" }]),
    ).toThrow("TODO.md has no ## Questions section")
  })
})

describe("sortItems", () => {
  test("moves open items into severity order and leaves done items in place", () => {
    const unsorted = todo.replace(
      "- [ ] (1) Card: the shadow on",
      "- [ ] (4) Card: the shadow on",
    )
    const { report, source } = sortItems(unsorted)
    expect(report).toEqual([{ line: "- [ ] (3) Tabs: the line is thin" }])
    expect(
      source
        .split("\n")
        .filter((line) => line.startsWith("- ["))
        .map((line) => line.slice(0, 13)),
    ).toEqual([
      "- [ ] (3) Tab",
      "- [ ] (4) Car",
      "- [x] (2) Chi",
      "- [ ] (2) Doc",
    ])
  })
})

describe("triageItems", () => {
  const untriaged = todo
    .replace("  - Summary: The card shadow looks wrong.\n", "")
    .replace("  - Summary: The intro is long.\n", "")
    .replace(
      "  - Recommended: Explain further. It is a question of taste.\n",
      "",
    )

  test("puts the Summary and Recommended notes first under the headline", () => {
    const { source } = triageItems(untriaged, [
      {
        line: "- [ ] (1) Card: the shadow on elevated",
        summary: "The card shadow looks wrong.",
      },
      {
        line: "- [ ] (2) Docs: the intro is long",
        recommended: "Explain further. It is a question of taste.",
        summary: "The intro is long.",
      },
    ])
    expect(source).toBe(todo)
  })

  test("rejects a note the item has or the page can't offer", () => {
    expect(() =>
      triageItems(todo, [
        { line: "- [ ] (3) Tabs: the line is thin", summary: "Thin." },
      ]),
    ).toThrow("it already has a Summary")
    expect(() =>
      triageItems(untriaged, [
        {
          line: "- [ ] (2) Docs: the intro is long",
          recommended: "Rewrite it",
        },
      ]),
    ).toThrow("recommended must be")
  })
})

describe("scripts/todo.mjs", () => {
  const todoMjs = (...args: string[]) =>
    spawnSync("node", ["scripts/todo.mjs", ...args], {
      encoding: "utf-8",
      input: args.includes("apply-answers")
        ? answers("- [ ] (1) Nope: this item doesn't exist", "  > Fix")
        : "",
    })

  test("prints the open items as JSON", () => {
    const { status, stdout } = todoMjs("list")
    expect(status).toBe(0)
    expect(JSON.parse(stdout).length).toBeGreaterThan(0)
  })

  test("fails on an answer that matches no item, and writes nothing", () => {
    const { status, stderr, stdout } = todoMjs("apply-answers", "--dry-run")
    expect(status).toBe(1)
    expect(
      JSON.parse(stdout).map(({ status }: { status: string }) => status),
    ).toEqual(["missing"])
    expect(stderr).toContain("match no item")
  })

  test("prints the usage for an unknown command", () => {
    const { status, stderr } = todoMjs("nope")
    expect(status).toBe(1)
    expect(stderr).toContain("Usage: node scripts/todo.mjs")
  })
})
