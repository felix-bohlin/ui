import nunjucks from "nunjucks"
import { describe, expect, test } from "vitest"
import { nunjucksExpression } from "../../scripts/component-nunjucks-expression.mjs"
import {
  analyze,
  conditionsOf,
  expand,
  isPure,
  keyOfCode,
  under,
} from "../../scripts/component-nunjucks-facts.mjs"
import {
  glue,
  layout,
  LIMIT,
  unmarked,
} from "../../scripts/component-nunjucks-layout.mjs"
import { compileNunjucks } from "../../scripts/component-nunjucks.mjs"
import { readComponent } from "../../scripts/component-reader.mjs"
import { configure } from "../../packages/opui/nunjucks/index"

const key = (code: string) => keyOfCode(code)

const SAMPLE = `---
import type { Props } from "./types.astro"
import Inner from "./Inner.astro"
const { label, ...rest } = Astro.props
const hasLabel = Boolean(label)
const labelId = Astro.slots.has("label") ? \`\${label}-id\` : undefined
const twice = label || "x"
const passed = label ?? undefined
---

<div {...rest}>{Astro.slots.has("label") && <span id={labelId}><slot name="label" /></span>}{hasLabel && <p title={twice}>{twice}</p>}<Inner value={passed} /></div>
`

const FILE = "packages/opui/components/Tabs/Sample.astro"

describe("the facts", () => {
  test("keyOf ignores formatting and keeps literal values apart", () => {
    expect(key('Astro.slots.has(\n  "label",\n)')).toBe(
      key('Astro.slots.has("label")'),
    )
    expect(key('a && "x  y"')).not.toBe(key('a && "x y"'))
    expect(key("!a")).not.toBe(key("-a"))
  })

  test("conditionsOf splits a test into what it makes true", () => {
    expect(conditionsOf("a && (b && c)")).toEqual(
      new Set([
        key("a && (b && c)"),
        key("a"),
        key("b && c"),
        key("b"),
        key("c"),
      ]),
    )
    expect(under(new Set([key("a")]), "b")).toEqual(
      new Set([key("a"), key("b")]),
    )
  })

  test("expand inlines values and simplifies conditions a block makes true, and nothing else", () => {
    const inline = new Map([["id", "c ? `${x}-id` : undefined"]])
    expect(key(expand("id", { facts: conditionsOf("c"), inline }))).toBe(
      key("`${x}-id`"),
    )
    expect(key(expand("id", { inline }))).toBe(key("c ? `${x}-id` : undefined"))
    expect(key(expand("item.id", { inline }))).toBe(key("item.id"))
    expect(key(expand("{ id }", { inline }))).toBe(
      key("{ id: c ? `${x}-id` : undefined }"),
    )
  })

  test("isPure refuses the calls that take an id", () => {
    const impure = new Set(["idOf", "createIds"])
    expect(isPure("cx([a, b])", impure)).toBe(true)
    expect(isPure('a || idOf("tab")', impure)).toBe(false)
    expect(isPure('ids()("title")', impure)).toBe(false)
  })

  test("analyze counts the reads and tells tests and null-agnostic reads apart", async () => {
    const facts = analyze(await readComponent(SAMPLE, FILE))
    expect(facts.count("labelId")).toBe(1)
    expect(facts.count("twice")).toBe(2)
    expect(facts.testOnly("hasLabel")).toBe(true)
    expect(facts.testOnly("twice")).toBe(false)
    expect(facts.nullAgnostic("labelId")).toBe(true)
    expect(facts.nullAgnostic("passed")).toBe(false)
  })

  test("the emitter inlines a value read once and drops the guard its block makes redundant", async () => {
    const macro = await compileNunjucks(SAMPLE, FILE)
    expect(macro).toContain(`id="{{ props.label ~ '-id' }}"`)
    expect(macro).not.toContain("labelId")
    expect(macro).toContain("{%- set twice = props.label or ")
    expect(macro).toContain("{{ Inner({ value: passed }) -}}")
  })

  test("undefined becomes none only where null and undefined give the same result", () => {
    const scope = {
      file: "Sample.astro",
      helpers: new Set(["pick"]),
      locals: new Set(["a", "b"]),
      undefinedAs: "none",
    }
    expect(nunjucksExpression("a ? b : undefined", scope)).toBe(
      "b if a else none",
    )
    expect(nunjucksExpression("pick(undefined)", scope)).toBe(
      "opui.pick(undefined)",
    )
    expect(nunjucksExpression("a === undefined", scope)).toBe("a is undefined")
  })
})

describe("the layout", () => {
  const env = configure(new nunjucks.Environment(null, { autoescape: true }))
  const render = (template: string) =>
    env.renderString(template, { a: "A", b: "", c: "C" })

  test("a long line breaks only where a template tag makes the whitespace free", () => {
    const parts = Array.from(
      { length: 8 },
      (_, index) =>
        `{% if a %}<span class="item-${index}">{{ a }}</span>{% endif %}`,
    )
    const template = `  <p>${parts.reduce((written, part) => glue(written, part, 2))}</p>`
    const laid = String(layout(template))
    expect(laid.split("\n").length).toBeGreaterThan(1)
    expect(laid.split("\n").every((line) => line.length <= LIMIT)).toBe(true)
    expect(render(laid)).toBe(render(unmarked(template)))
  })

  test("text that ends in }} never takes a break after it", () => {
    const template = `  <p>${glue("x}}".repeat(40), "y".repeat(40), 2)}</p>`
    expect(String(layout(template))).toBe(template)
  })

  test("a long tag expression wraps at its top-level operators", () => {
    const expression = Array.from({ length: 12 }, (_, index) =>
      index % 2 ? "a and c" : "b or a",
    ).join(" or ")
    const tag = `  {%- set label = ${expression} -%}`
    const laid = String(layout(tag))
    expect(tag.length).toBeGreaterThan(LIMIT)
    expect(laid.split("\n").length).toBeGreaterThan(1)
    expect(render(`${laid}{{ label }}`)).toBe(render(`${tag}{{ label }}`))
  })
})
