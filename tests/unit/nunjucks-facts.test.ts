import nunjucks from "nunjucks"
import { describe, expect, test } from "vitest"
import { nunjucksExpression } from "../../scripts/component-nunjucks-expression.mjs"
import {
  analyze,
  conditionsOf,
  expand,
  isPure,
  keyOfCode,
  mentions,
  under,
} from "../../scripts/component-nunjucks-facts.mjs"
import {
  glue,
  layout,
  LIMIT,
  unmarked,
} from "../../scripts/component-nunjucks-layout.mjs"
import { compileNunjucks, keptNone } from "../../scripts/component-nunjucks.mjs"
import { readComponent } from "../../scripts/component-reader.mjs"
import { astroPropsOf } from "../../scripts/example-react-props.mjs"
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

  test("mentions finds a name in a key, and not a longer name or a string", () => {
    expect(mentions(key("a && b.c"), new Set(["b"]))).toBe(true)
    expect(mentions(key("labelId && x"), new Set(["label"]))).toBe(false)
    expect(mentions(key('x === "I:label"'), new Set(["label"]))).toBe(false)
  })

  test("analyze counts the reads of a variable tag and of the group item's warning", async () => {
    const sample = await readComponent(
      `---\nimport type { Props } from "./types.astro"\nconst { href, ...rest } = Astro.props\nconst Tag = href ? "a" : "span"\n---\n\n<Tag {...rest} href={href} />\n`,
      FILE,
    )
    expect(analyze(sample).count("Tag")).toBe(1)
    const item = {
      derived: [],
      item: { checked: "checked", group: "Tabs", grouped: "grouped" },
      name: "TabsItem",
      tree: [],
      warnings: [],
    }
    expect(analyze(item).count("grouped")).toBe(1)
  })

  test("a prop keeps none only where its type takes null and a read tells null from not given", async () => {
    const sample = await readComponent(
      `---\nimport type { Props } from "./types.astro"\nconst { class: className, id = "tabs", role, ...rest } = Astro.props\n---\n\n<div {...rest} class:list={["ui-tabs", className]} id={id} role={role ?? "tablist"} />\n`,
      FILE,
    )
    expect(
      keptNone(sample, astroPropsOf("Tabs", sample.propsType)).map(
        ({ prop }: { prop: string }) => prop,
      ),
    ).toEqual(["class", "id"])
  })

  test("a comparison with a value reads null and not given alike, and a comparison with null or an order does not", async () => {
    const facts = analyze(
      await readComponent(
        `---\nimport type { Props } from "./types.astro"\nconst { a, b, c, ...rest } = Astro.props\n---\n\n<div {...rest} data-a={a === "tablist" ? "x" : undefined} data-b={b === null ? "x" : undefined} data-c={c < 1 ? "x" : undefined} />\n`,
        FILE,
      ),
    )
    expect(facts.nullAgnostic("a")).toBe(true)
    expect(facts.nullAgnostic("b")).toBe(false)
    expect(facts.nullAgnostic("c")).toBe(false)
  })

  test("a value its default or its block makes non-null renders without a none guard", async () => {
    const macro = await compileNunjucks(
      `---\nimport type { Props } from "./types.astro"\nconst { id = "tabs", orientation = "horizontal", role, ...rest } = Astro.props\n---\n\n<div {...rest} aria-orientation={orientation} id={id}>{role && <span role={role} />}</div>\n`,
      FILE,
    )
    expect(macro).toContain('aria-orientation="{{ orientation }}"')
    expect(macro).toContain('{%- if id != none %} id="{{ id }}"{% endif %}')
    expect(macro).toContain('<span role="{{ props.role }}">')
  })

  test("a list field of a helper's result gives its items their kind, and items that can't be none need no guard", async () => {
    const macro = await compileNunjucks(
      `---\nimport type { Props } from "./types.astro"\nimport { ratingOf } from "./rating"\nconst { max, value, ...rest } = Astro.props\nconst rating = ratingOf(max, value)\n---\n\n<ul {...rest}>{rating.stars.map((star) => <li data-checked={rating.current === star} data-star={star} />)}</ul>\n`,
      "packages/opui/components/Rating/Sample.astro",
    )
    expect(macro).toContain("rating.current == star")
    expect(macro).toContain('data-star="{{ star }}"')
  })

  test("a prop with a name Nunjucks reads in brackets gets one local where several attributes print it as is", async () => {
    const source = (second: string) =>
      `---\nimport type { Props } from "./types.astro"\nconst { "aria-describedby": describedBy, ...rest } = Astro.props\n---\n\n<div {...rest}><input aria-describedby={describedBy} /><input aria-describedby={${second}} /></div>\n`
    const shared = await compileNunjucks(source("describedBy"), FILE)
    expect(shared).toContain(
      '{%- set describedBy = props["aria-describedby"] -%}',
    )
    expect(shared).not.toContain('{{ props["aria-describedby"] }}')
    const mixed = await compileNunjucks(source('describedBy ?? "x"'), FILE)
    expect(mixed).not.toContain("{%- set describedBy")
  })

  test("a list a helper returns gives its items' fields their kinds", async () => {
    const macro = await compileNunjucks(
      `---\nimport type { Props } from "./types.astro"\nimport { pillsOf } from "./pills"\nconst { items, ...rest } = Astro.props\nconst pills = pillsOf(items)\n---\n\n<ul {...rest}>{pills.map((item) => <li>{item.label}{item.checked}</li>)}</ul>\n`,
      "packages/opui/components/Reactions/Sample.astro",
    )
    expect(macro).toContain("{{ item.label }}")
    expect(macro).toContain("{{ item.checked | opuiText }}")
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

  test("a long line breaks between tags first, then inside a tag at its operators or outermost brackets, and renders the same", () => {
    const template = [
      `  <p class="x{% if a and a != 'b' %} ui-${"y".repeat(60)}-{{ a }}{% endif %}">{% set list = [${Array.from({ length: 8 }, (_, index) => `"item-${index}"`).join(", ")}] %}{{ list | join(" ") }}</p>`,
      `  {{- { title: (a ~ "${"z".repeat(50)}") if c else (b or "${"w".repeat(50)}"), lang: c } | opuiAttributes }}`,
    ].join("\n")
    const laid = String(layout(template))
    expect(template.split("\n").some((line) => line.length > LIMIT)).toBe(true)
    expect(laid.split("\n").filter((line) => line.length > LIMIT)).toEqual([])
    expect(laid).toMatch(/\{%- set list = \[\n +"item-0",\n/)
    expect(laid).toMatch(/\n +if c\n +else \(b or/)
    expect(render(laid)).toBe(render(template))
  })

  test("a long line keeps an attribute value whole when another break fits", () => {
    const template = `  <input title="{{ a }}"${' data-x="1"'.repeat(6)}{% if c %} hidden{% endif %}${' data-y="2"'.repeat(3)}>`
    const laid = String(layout(template))
    expect(template.length).toBeGreaterThan(LIMIT)
    expect(laid).toContain('title="{{ a }}"')
    expect(laid.split("\n")[1].trimStart()).toMatch(/^\{%- if c %\}/)
    expect(render(laid)).toBe(render(template))
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
