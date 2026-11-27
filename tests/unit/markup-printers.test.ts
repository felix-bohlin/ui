import { describe, expect, test } from "vitest"
import { asFragment } from "../../scripts/component-fragment.mjs"
import { attributeNode, selfCloses } from "../../scripts/markup-nodes.mjs"
import {
  JSX_DIALECTS,
  jsxAttributeCode,
  jsxName,
  jsxPrinter,
  renderedText as jsxRenderedText,
  SPACE as JSX_SPACE,
  sourceText as jsxSourceText,
} from "../../scripts/print-jsx.mjs"
import {
  SPACE as SVELTE_SPACE,
  renderedText as svelteRenderedText,
  sourceText as svelteSourceText,
  svelteAttribute,
  svelteEach,
  svelteElement,
  svelteRender,
} from "../../scripts/print-svelte.mjs"
import {
  SPACE as VUE_SPACE,
  renderedText as vueRenderedText,
  slotInputs,
  sourceText as vueSourceText,
  vueAttribute,
  vueBinding,
  vueElement,
  vueFor,
} from "../../scripts/print-vue.mjs"

type Attribute = { code?: string; kind: string; name: string; value?: string }

type Node = {
  attributes?: Attribute[]
  children?: Node[]
  code?: string
  component?: boolean
  custom?: boolean
  foreign?: boolean
  inline?: boolean
  key?: string
  list?: string
  item?: string
  row?: Node
  tag?: string
  type: string
  value?: string
  variable?: boolean
}

const element = (
  tag: string,
  attributes: Attribute[] = [],
  children: Node[] = [],
  facts: Partial<Node> = {},
): Node => ({ attributes, children, tag, type: "element", ...facts })

const text = (value: string, facts: Partial<Node> = {}): Node => ({
  type: "text",
  value,
  ...facts,
})

const each = (row: Node, list = "items", item = "item", key = "item.id") => ({
  children: [text("\n"), row, text("\n")],
  item,
  key,
  list,
  row,
  type: "each",
})

const statics = (value: string) => ({ kind: "static", name: "title", value })

const written = (part: unknown) => asFragment(part).code

const QUOTED = ['say "hi"', String.raw`a\b`, "{x}", "a\nb"] as const

describe("the node vocabulary", () => {
  const refuse = (what: string) => new Error(what)

  test("an Astro attribute becomes static, boolean or expression, and a template literal keeps its backticks", () => {
    expect(
      attributeNode({ kind: "quoted", name: "id", value: "a" }, refuse),
    ).toEqual({ kind: "static", name: "id", value: "a" })
    expect(attributeNode({ kind: "empty", name: "hidden" }, refuse)).toEqual({
      kind: "boolean",
      name: "hidden",
    })
    expect(
      attributeNode(
        { kind: "expression", name: "id", value: " base " },
        refuse,
      ),
    ).toEqual({ code: "base", kind: "expression", name: "id" })
    expect(
      attributeNode(
        { kind: "template-literal", name: "id", value: "${base}-label" },
        refuse,
      ),
    ).toEqual({ code: "`${base}-label`", kind: "expression", name: "id" })
  })

  test("a directive is refused whatever its value, and so is a spread", () => {
    expect(() =>
      attributeNode({ kind: "quoted", name: "is:raw", value: "" }, refuse),
    ).toThrow("the directive is:raw")
    expect(() =>
      attributeNode(
        { kind: "expression", name: "class:list", value: "[]" },
        refuse,
      ),
    ).toThrow("the directive class:list")
    expect(() =>
      attributeNode({ kind: "spread", name: "rest", value: "" }, refuse),
    ).toThrow("the attribute rest")
  })

  test("a void element always closes itself, and an empty element closes itself when the policy names its kind", () => {
    const closes = (node: Node, content: string) =>
      (["components", "foreign", "every"] as const).map((policy) =>
        selfCloses(node, content, policy),
      )
    expect(closes(element("input"), "")).toEqual([true, true, true])
    expect(
      closes(element("Card", [], [], { component: true }), "\n  "),
    ).toEqual([true, true, true])
    expect(closes(element("Tag", [], [], { variable: true }), "")).toEqual([
      true,
      true,
      true,
    ])
    expect(closes(element("path", [], [], { foreign: true }), "")).toEqual([
      false,
      true,
      true,
    ])
    expect(closes(element("span"), "")).toEqual([false, false, true])
    expect(closes(element("Card", [], [], { component: true }), "Hi")).toEqual([
      false,
      false,
      false,
    ])
  })
})

describe("the JSX printer", () => {
  const react = JSX_DIALECTS.react
  const solid = JSX_DIALECTS.solid
  const refuse = (what: string) => new Error(what)
  const printer = (
    dialect: typeof react,
    options: Record<string, unknown> = {},
  ) =>
    jsxPrinter(dialect, {
      emptyElements: "components",
      other: () => "",
      props: (node: Node) => ({
        attributes: (node.attributes ?? []).map((item) =>
          jsxAttributeCode(
            dialect,
            { item, name: item.name, where: `<${node.tag}>` },
            { policy: "keep", refuse },
          ),
        ),
      }),
      refuse,
      text: jsxSourceText,
      ...options,
    })
  const branch = (
    dialect: typeof react,
    nodes: Node[],
    options?: Record<string, unknown>,
    extra?: string,
  ) => written(printer(dialect, options).branch(nodes, undefined, extra))

  test("an empty element closes itself by the policy it is given", () => {
    const nodes = [
      element("span"),
      element("input"),
      element("Card", [], [text("\n")], { component: true }),
    ]
    expect(branch(react, nodes)).toBe("<><span></span><input /><Card /></>")
    expect(branch(react, nodes, { emptyElements: "every" })).toBe(
      "<><span /><input /><Card /></>",
    )
  })

  test("one element prints as it is, anything else in a fragment, and so does an element with something after it", () => {
    expect(branch(react, [text("\n"), element("p"), text("\n")])).toBe(
      "<p></p>",
    )
    expect(branch(react, [element("p"), element("p")])).toBe(
      "<><p></p><p></p></>",
    )
    expect(branch(react, [{ code: "title", type: "expression" }])).toBe(
      "<>{title}</>",
    )
    expect(
      branch(react, [{ code: "title", type: "expression" }], {
        bare: (node: Node & { code: string }) => node.code,
      }),
    ).toBe("title")
    expect(branch(react, [element("p")], {}, "<style />")).toBe(
      "<><p></p><style /></>",
    )
  })

  test("a slotted child is a prop, not content", () => {
    expect(
      branch(react, [
        element("p"),
        element("b", [], [], { slot: "icon" } as Partial<Node>),
      ]),
    ).toBe("<p></p>")
  })

  test("a React loop keys its row, a static Solid list maps without a key or an unread parameter, and a reactive one uses For", () => {
    const row = element("li", [], [{ code: "item.label", type: "expression" }])
    expect(written(printer(react).render([each(row)], undefined))).toBe(
      "{items.map((item) => (\n<li key={item.id}>{item.label}</li>\n))}",
    )
    expect(written(printer(solid).render([each(row)], undefined))).toBe(
      "{items.map((item) => (\n<li>{item.label}</li>\n))}",
    )
    expect(
      written(
        printer(solid).render(
          [each(element("li", [], [text("Row")]))],
          undefined,
        ),
      ),
    ).toBe("{items.map(() => (\n<li>Row</li>\n))}")
    const reactive = printer(solid, { lists: "reactive" }).render(
      [each(row)],
      undefined,
    )
    expect(written(reactive)).toBe(
      "<For each={items} keyed={false}>{(item) => (\n<li>{item.label}</li>\n)}</For>",
    )
    expect(asFragment(reactive).imports).toEqual([
      { module: "solid-js", name: "For" },
    ])
  })

  test("a space that must render is the explicit token, a line break between inline siblings too, and text is encoded for JSX", () => {
    expect(JSX_SPACE).toBe('{" "}')
    expect(jsxSourceText([text(" ")])).toBe('{" "}')
    expect(jsxSourceText([text("\n", { inline: true })])).toBe('{" "}')
    expect(jsxSourceText([text("\n")])).toBe("\n")
    expect(jsxSourceText([text("a {b} &amp; c")])).toBe('a {"{"}b{"}"} &amp; c')
    const parts = (node: Node) =>
      node.value === "a"
        ? [{ text: "a" }, { role: "space", run: " " }]
        : [{ role: "drop", run: "\n  " }, { text: "&lt;b&gt; {c}" }]
    expect(jsxRenderedText(parts)([text("a"), text("b")])).toBe(
      'a &lt;b&gt; {"{"}c{"}"}',
    )
  })

  test("a name the types don't have is refused or kept as written, by policy", () => {
    const label = react.propsOf("label", false)
    expect(jsxName(react, label, "for", "refuse")).toBe("htmlFor")
    expect(jsxName(react, label, "tabindex", "refuse")).toBe("tabIndex")
    expect(jsxName(react, label, "data-state", "refuse")).toBe("data-state")
    expect(jsxName(react, label, "nope", "refuse")).toBe(undefined)
    expect(jsxName(react, label, "nope", "keep")).toBe("nope")
    expect(jsxName(react, undefined, "class", "keep")).toBe("className")
    const solidLabel = solid.propsOf("label", false)
    expect(jsxName(solid, solidLabel, "for", "refuse")).toBe("for")
    expect(jsxName(solid, solidLabel, "nope", "refuse")).toBe(undefined)
    expect(jsxName(solid, undefined, "nope", "keep")).toBe("nope")
  })

  test("a static value takes the quote it doesn't contain, or a string expression, and the types decide the rest under the refuse policy", () => {
    const value = (
      dialect: typeof react,
      item: Attribute,
      table?: Map<string, Set<string>>,
    ) =>
      written(
        jsxAttributeCode(
          dialect,
          { item, name: item.name, table, where: "<input>" },
          { policy: table ? "refuse" : "keep", refuse },
        ),
      )
    for (const dialect of [react, solid]) {
      expect(QUOTED.map((title) => value(dialect, statics(title)))).toEqual([
        "title='say \"hi\"'",
        String.raw`title="a\b"`,
        'title="{x}"',
        String.raw`title={"a\nb"}`,
      ])
    }
    const input = react.propsOf("input", false)
    const textarea = react.propsOf("textarea", false)
    expect(value(react, { kind: "boolean", name: "disabled" }, input)).toBe(
      "disabled",
    )
    expect(value(react, { kind: "boolean", name: "title" }, input)).toBe(
      'title=""',
    )
    expect(
      value(react, { kind: "static", name: "rows", value: "3" }, textarea),
    ).toBe("rows={3}")
    expect(() =>
      value(react, { kind: "static", name: "rows", value: "x" }, textarea),
    ).toThrow(
      'the string "x" for the prop rows of <input>, which React types as number',
    )
    expect(value(react, { kind: "boolean", name: "nope" })).toBe("nope")
    expect(
      value(react, { kind: "static", name: "style", value: "--_a: 1" }),
    ).toBe('style={{ "--_a": "1" }}')
    expect(
      value(solid, { kind: "static", name: "style", value: "--_a: 1" }),
    ).toBe('style="--_a: 1"')
  })
})

describe("the Svelte printer", () => {
  test("a static value takes braces for a brace, a line break or a double quote, and a component's numeric attribute is a number", () => {
    expect(
      QUOTED.map((title) =>
        written(svelteAttribute(element("a"), statics(title))),
      ),
    ).toEqual([
      String.raw`title={"say \"hi\""}`,
      String.raw`title="a\b"`,
      'title={"{x}"}',
      String.raw`title={"a\nb"}`,
    ])
    const tabindex = { kind: "static", name: "tabindex", value: "0" }
    expect(
      svelteAttribute(element("Table", [], [], { component: true }), tabindex),
    ).toBe("tabindex={0}")
    expect(svelteAttribute(element("div"), tabindex)).toBe('tabindex="0"')
    expect(
      written(
        svelteAttribute(element("a"), {
          code: "href",
          kind: "expression",
          name: "href",
        }),
      ),
    ).toBe("href={href}")
  })

  test("an element closes by the policy, a variable tag is svelte:element and a bound progress value is keyed", () => {
    const print = (node: Node, content = "", emptyElements = "components") =>
      written(svelteElement(node, { attributes: "", content, emptyElements }))
    expect(print(element("input"))).toBe("<input />")
    expect(print(element("Table", [], [], { component: true }))).toBe(
      "<Table />",
    )
    expect(print(element("div"))).toBe("<div></div>")
    expect(print(element("path", [], [], { foreign: true }))).toBe(
      "<path></path>",
    )
    expect(
      print(element("path", [], [], { foreign: true }), "", "foreign"),
    ).toBe("<path />")
    expect(print(element("Tag", [], [], { variable: true }), "Hi")).toBe(
      "<svelte:element this={Tag}>Hi</svelte:element>",
    )
    const progress = element("progress", [
      { code: "value", kind: "expression", name: "value" },
    ])
    expect(
      written(
        svelteElement(progress, {
          attributes: "value={value}",
          emptyElements: "foreign",
        }),
      ),
    ).toBe("{#key value == null}\n<progress value={value}></progress>\n{/key}")
  })

  test("a loop is keyed by its key and a snippet renders with ?. unless it is guarded", () => {
    expect(
      written(
        svelteEach(
          { index: undefined, item: "{ id }", key: "id", list: "rows" },
          "row",
        ),
      ),
    ).toBe("{#each rows as { id } (id)}row{/each}")
    expect(
      written(
        svelteEach(
          { index: "index", item: "item", key: "index", list: "rows" },
          "row",
        ),
      ),
    ).toBe("{#each rows as item, index (index)}row{/each}")
    expect(svelteRender("icon", { optional: true })).toBe("{@render icon?.()}")
    expect(svelteRender("content", { argument: "label" })).toBe(
      "{@render content(label)}",
    )
  })

  test("a space at the edge of the content is the explicit token, since Svelte trims it", () => {
    expect(SVELTE_SPACE).toBe('{" "}')
    expect(svelteSourceText(text(" "))).toBe('{" "}')
    expect(svelteSourceText(text("\n", { inline: true }))).toBe("\n")
    const parts = [
      { role: "space", run: " " },
      { text: "a" },
      { role: "space", run: "\n" },
      { text: "b" },
      { role: "drop", run: "\n\n" },
    ]
    expect(svelteRenderedText(parts, { leading: true, trailing: false })).toBe(
      '{" "}a b\n\n',
    )
  })
})

describe("the Vue printer", () => {
  test("a bound value escapes its double quotes, and a static one takes the quote it doesn't contain", () => {
    expect(written(vueBinding(":items", '[{ label: "A" }]'))).toBe(
      ':items="[{ label: &quot;A&quot; }]"',
    )
    expect(
      QUOTED.map((title) => written(vueAttribute(statics(title)))),
    ).toEqual([
      "title='say \"hi\"'",
      String.raw`title="a\b"`,
      'title="{x}"',
      'title="a&#10;b"',
    ])
    expect(
      written(
        vueAttribute({ code: "label", kind: "expression", name: "title" }),
      ),
    ).toBe(':title="label"')
  })

  test("a static value of an input straight in a component's slot is written as an attribute", () => {
    const input = element("input", [
      { kind: "static", name: "value", value: "it's" },
    ])
    const readonly = element("input", [{ kind: "boolean", name: "readonly" }])
    const nested = element("input")
    const inputs = slotInputs([
      input,
      readonly,
      { children: [nested], type: "fragment" },
      element("div", [], [element("input")]),
    ])
    expect([...inputs]).toEqual([input, nested])
    expect(
      written(vueAttribute(input.attributes![0], undefined, { slotted: true })),
    ).toBe(":value.attr=\"'it\\'s'\"")
  })

  test("a loop is a v-for with its key, with the index in parentheses", () => {
    expect(
      written(
        vueFor({ index: undefined, item: "{ id }", key: "id", list: "rows" }),
      ),
    ).toBe('v-for="{ id } in rows" :key="id"')
    expect(
      written(
        vueFor({ index: "index", item: "item", key: "index", list: "rows" }),
      ),
    ).toBe('v-for="(item, index) in rows" :key="index"')
  })

  test("a variable tag, a custom element and a tag Vue can't resolve render through component", () => {
    const print = (node: Node, is?: string) =>
      written(
        vueElement(node, {
          attributes: 'class="a"',
          content: "Hi",
          emptyElements: "foreign",
          is,
        }),
      )
    expect(print(element("Tag", [], [], { variable: true }), "tag")).toBe(
      '<component :is="tag" class="a">Hi</component>',
    )
    expect(print(element("opui-copy", [], [], { custom: true }))).toBe(
      '<component is="opui-copy" class="a">Hi</component>',
    )
    expect(print(element("search"))).toBe(
      '<component is="search" class="a">Hi</component>',
    )
    expect(
      written(
        vueElement(element("path", [], [], { foreign: true }), {
          attributes: "",
          emptyElements: "components",
        }),
      ),
    ).toBe("<path></path>")
  })

  test("a space between two elements or at the edge of blank text is the explicit token, since Vue drops it", () => {
    expect(VUE_SPACE).toBe('{{ " " }}')
    expect(vueSourceText(text(" "))).toBe('{{ " " }}')
    expect(vueSourceText(text("\n", { inline: true }))).toBe('{{ " " }}')
    const space = [{ role: "space", run: "\n  " }]
    const position = { blank: true, leading: false, trailing: false }
    expect(vueRenderedText(space, { ...position, between: true })).toBe(
      '{{ " " }}',
    )
    expect(vueRenderedText(space, { ...position, between: false })).toBe(" ")
  })
})
