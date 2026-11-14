import { describe, expect, test } from "vitest"
import {
  boxesOf,
  cssRules,
  matches,
  parseSelectorList,
  renderedText,
  specificityOf,
} from "../../scripts/example-display.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"

const elements = (nodes: ReturnType<typeof parseHtml>): any[] =>
  nodes.flatMap((node) =>
    node.type === "element" ? [node, ...elements(node.children)] : [],
  )

const find = (html: string, tag: string) => {
  const nodes = parseHtml(html)
  return { element: elements(nodes).find((node) => node.tag === tag), nodes }
}

const boxOf = (html: string, tag: string, css: string[] = []) => {
  const { element, nodes } = find(html, tag)
  return boxesOf(nodes, css).get(element)
}

const texts = (html: string, css: string[] = []) => {
  const nodes = parseHtml(html)
  return [...renderedText(nodes, { css })]
    .toSorted(([a], [b]) => a.start - b.start)
    .map(([, { text }]) => text)
}

describe("the selector matcher", () => {
  test.each([
    ['<div class="a"><p class="b"></p></div>', "p", ".a > .b", true],
    ['<div class="a"><p class="b"></p></div>', "p", ":where(.a) .b", true],
    ['<div class="a"><p class="b"></p></div>', "p", ":is(.a > .b)", true],
    ['<div class="x"><p class="b"></p></div>', "p", ":is(.a > .b)", false],
    ['<div><p></p><span class="c"></span></div>', "span", "p + .c", true],
    ["<div><p></p><i></i><span></span></div>", "span", "p ~ span", true],
    ["<div><p></p><i></i><span></span></div>", "span", "p + span", false],
    ['<div class="a"><p><i></i></p></div>', "div", ".a:has(> p)", true],
    ['<div class="a"><p><i></i></p></div>', "div", ".a:has(> i)", false],
    ['<div class="a"><p><i></i></p></div>', "div", ".a:has(i)", true],
    ['<div role="group"></div>', "div", '[role="group"]', true],
    [
      '<div hidden="UNTIL-FOUND"></div>',
      "div",
      '[hidden="until-found" i]',
      true,
    ],
    ["<ul><li></li><li></li></ul>", "li", "li:nth-child(1)", true],
    ['<input type="checkbox" checked>', "input", "input:checked", true],
    ["<p></p>", "p", "p:empty", true],
    ["<p> </p>", "p", "p:empty", false],
    ["<p></p>", "p", "p:not(:empty)", false],
    ["<my-el></my-el>", "my-el", "my-el:defined", true],
    ["<div popover></div>", "div", "div:popover-open", false],
  ])("%s: <%s> matches %s is %s", (html, tag, selector, expected) => {
    const { element, nodes } = find(html, tag)
    expect(matches(selector, element, nodes)).toBe(expected)
  })

  test("rejects a pseudo-class it doesn't know", () => {
    const { element, nodes } = find("<p></p>", "p")
    expect(() => matches("p:nonsense", element, nodes)).toThrow(
      "the pseudo-class :nonsense",
    )
  })
})

describe("cssRules", () => {
  test("resolves nesting and @scope into one selector per rule", () => {
    const rules = cssRules(
      "@layer components.root { :where(.a) { & > .b { display: flex } .c { display: grid } } } @scope (.r) { p { white-space: pre } }",
    )
    expect(rules.map(({ text }) => text)).toEqual([
      ":is(:where(.a)) > .b",
      ":is(:where(.a)) .c",
      ":where(.r) p",
    ])
  })

  test("a scope limit excludes the limit elements and their descendants without adding specificity", () => {
    const rules = cssRules(
      "@scope (.r) to (.stop) { p { display: flex } :scope > q { display: grid } }",
    )
    expect(rules.map(({ text }) => text)).toEqual([
      ":where(.r) p:where(:not(:is(.stop), :is(.stop) *))",
      ":where(.r) > q:where(:not(:is(.stop), :is(.stop) *))",
    ])
    expect(
      boxOf('<div class="r"><div class="stop"><p>a</p></div></div>', "p", [
        "@scope (.r) to (.stop) { p { display: flex } }",
      ]),
    ).toMatchObject({ inner: "flow" })
    expect(
      boxOf('<div class="r"><p>a</p></div>', "p", [
        "@scope (.r) to (.stop) { p { display: flex } }",
      ]),
    ).toMatchObject({ inner: "flex" })
    expect(specificityOf(rules[0].selector[0])).toBe(1)
  })

  test("skips pseudo-elements other than ::before and ::after", () => {
    expect(cssRules(".a::marker, .b::first-line { display: block }")).toEqual(
      [],
    )
  })

  test("reads generated content on ::before and ::after", () => {
    expect(
      cssRules('.a::after, .b:before { content: "*"; position: static }'),
    ).toEqual([
      expect.objectContaining({
        generated: { content: '"*"', display: undefined, position: "static" },
        pseudo: "before",
        text: ".b ::before",
      }),
      expect.objectContaining({ pseudo: "after", text: ".a ::after" }),
    ])
  })

  test.each([
    ["@media (width > 1px) { .a { display: flex } }", "@media"],
    ["@layer nope { .a { display: flex } }", "the layer nope"],
    ["@supports (display: grid) { .a { display: grid } }", "@supports"],
  ])("rejects %s", (css, reason) => {
    expect(() => cssRules(css)).toThrow(reason)
  })

  test("skips @media print, which never applies on screen", () => {
    expect(
      cssRules(
        "pre { white-space: pre; @media print { white-space: pre-wrap } } @media print { .a { display: none } }",
      ).map(({ display, text, whiteSpace }) => ({ display, text, whiteSpace })),
    ).toEqual([{ display: undefined, text: "pre", whiteSpace: "pre" }])
  })

  test("follows content inside @supports, which reads the same either way", () => {
    expect(
      cssRules(
        '.a::after { content: "*" } @supports (content: "*" / "") { .a::after { content: "*" / "" } }',
      ).map(({ generated }) => generated?.content),
    ).toEqual(['"*"', '"*" / ""'])
  })

  test.each([
    [".a.b", 2000],
    ["#x .a", 1_001_000],
    [":where(.a) p", 1],
    [":is(.a, #b) p", 1_000_001],
    [".a:not(.b.c)", 3000],
    ["ul > li:nth-child(2)", 1002],
    [".x:has(> .a .b)", 3000],
  ])("%s has specificity %i", (selector, expected) => {
    const [steps] = parseSelectorList(selector)
    expect(specificityOf(steps)).toBe(expected)
  })
})

describe("boxesOf", () => {
  test("component classes, UA defaults and inline styles", () => {
    expect(boxOf('<span class="ui-button">a</span>', "span")).toMatchObject({
      inner: "flex",
      outer: "atomic",
    })
    expect(boxOf("<p>a</p>", "p")).toMatchObject({
      inner: "flow",
      outer: "block",
    })
    expect(boxOf("<span>a</span>", "span")).toMatchObject({ outer: "inline" })
    expect(
      boxOf('<p class="ui-button" style="display: block">a</p>', "p"),
    ).toMatchObject({ outer: "block" })
    expect(boxOf("<img alt=''>", "img")).toMatchObject({ outer: "block" })
    expect(boxOf("<img alt='' style='display: inline'>", "img")).toMatchObject({
      outer: "atomic",
    })
  })

  test("a later layer wins over an earlier one, and an unlayered rule over both", () => {
    expect(
      boxOf('<span class="x">a</span>', "span", [
        "@layer components.extended { .x { display: grid } } @layer components.root { .x { display: flex } }",
      ]),
    ).toMatchObject({ inner: "flex" })
    expect(
      boxOf('<span class="ui-button">a</span>', "span", [
        ".ui-button { display: block }",
      ]),
    ).toMatchObject({ inner: "flow", outer: "block" })
  })

  test("a more specific rule wins within a layer, and a later one between equals", () => {
    expect(
      boxOf('<p id="x" class="a b">a</p>', "p", [
        "#x { display: flex } .a.b { display: grid }",
      ]),
    ).toMatchObject({ inner: "flex" })
    expect(
      boxOf('<p class="a b">a</p>', "p", [
        ".a.b { display: flex } :where(.a.b) { display: grid }",
      ]),
    ).toMatchObject({ inner: "flex" })
    expect(
      boxOf('<p class="a b">a</p>', "p", [
        ".a { display: flex } .b { display: grid }",
      ]),
    ).toMatchObject({ inner: "grid" })
  })

  test("the core normalize makes replaced elements and fieldsets blocks", () => {
    expect(boxOf("<p>a <svg></svg> b</p>", "svg")).toMatchObject({
      outer: "block",
    })
    expect(boxOf("<fieldset><p>a</p></fieldset>", "fieldset")).toMatchObject({
      inner: "grid",
    })
  })

  test("the hidden rule in utils.css beats a component's display, an inline display beats it, and hidden keeps the display it would show with", () => {
    expect(
      boxOf('<span class="ui-button" hidden>a</span>', "span"),
    ).toMatchObject({ outer: "none" })
    expect(
      boxOf('<span style="display: inline-block" hidden>a</span>', "span"),
    ).toMatchObject({ outer: "atomic" })
    expect(boxOf("<p hidden>a</p>", "p")).toMatchObject({
      outer: "none",
      shown: { inner: "flow", outer: "block" },
    })
  })

  test("white-space is inherited", () => {
    expect(boxOf("<pre><code>a</code></pre>", "code")).toMatchObject({
      whiteSpace: "pre",
    })
  })

  test("rejects a display value it doesn't know", () => {
    expect(() => boxOf('<p style="display: math">a</p>', "p")).toThrow(
      "display: math",
    )
  })
})

describe("renderedText", () => {
  test.each([
    ["<p><kbd>A</kbd> <kbd>B</kbd></p>", ["A", " ", "B"]],
    ["<p>Read<em> more</em></p>", ["Read", " more"]],
    ["<p>a <b> b</b></p>", ["a ", "b"]],
    ["<p>\n  a  \n  b\n</p>", ["a b"]],
    ["<p>a&nbsp; b</p>", ["a  b"]],
    ["<p>a <br> b</p>", ["a", "b"]],
    ['<p>a <span class="ui-button"> b </span> c</p>', ["a ", "b", " c"]],
    ["<p>a <script>x</script> b</p>", ["a ", "x", "b"]],
    [
      '<div class="example-row">\n  <button>a</button>\n  <button>b</button>\n</div>',
      ["", "a", "", "b", ""],
    ],
    [
      "<table><tbody>\n<tr>\n<td> a </td>\n</tr>\n</tbody></table>",
      ["", "", "a", "", ""],
    ],
    ["<pre>  a\n  b </pre>", ["  a\n  b "]],
    ["<textarea> a </textarea>", [" a "]],
    ["<p>a <span popover> b </span> c</p>", ["a ", "b", "c"]],
    [
      '<label class="ui-checkbox"><input required type="checkbox"><span class="ui-label"> a </span></label>',
      ["a "],
    ],
    [
      '<label class="ui-checkbox"><input type="checkbox"><span class="ui-label"> a </span></label>',
      ["a"],
    ],
  ])("%s", (html, expected) => {
    expect(texts(`<div>${html}</div>`)).toEqual(expected)
  })

  test("the example root is a grid, so top-level spaces don't render", () => {
    expect(texts("<kbd>A</kbd> <kbd>B</kbd>")).toEqual(["A", "", "B"])
  })

  test("example CSS takes part", () => {
    expect(
      texts('<div class="row"><b>a</b> <b>b</b></div>', [
        ".row { display: flex }",
      ]),
    ).toEqual(["a", "", "b"])
  })
})
