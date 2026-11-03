import { existsSync, globSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  htmlFromRender,
  markTopLevelBlankLines,
  readExample,
} from "../../scripts/build-examples.mjs"
import { decodeText, htmlText } from "../../scripts/example-encoders.mjs"
import {
  BLANK_LINE_MARKER,
  cleanRender,
  meaningChange,
  meaningOf,
} from "../../scripts/example-html.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"

const clean = (html: string, css: string[] = []) =>
  cleanRender(html, { css }).markup

const same = (before: string, after: string, css: string[] = []) =>
  meaningChange(
    meaningOf(parseHtml(before), css),
    meaningOf(parseHtml(after), css),
  )

describe("cleanRender", () => {
  test("drops Astro's attributes, slot and hoisted scripts", () => {
    expect(
      clean(
        '<p data-astro-cid-x slot="end">a</p>\n\n<script type="module" src="/x.astro?astro&type=script&index=0&lang.ts"></script>\n<p>b</p>',
      ),
    ).toBe("<p>a</p>\n<p>b</p>")
  })

  test.each([
    ["<style>a{}</style>", "<style>"],
    ["<script>a()</script>", "<script>"],
    ['<link rel="stylesheet" href="/a.css">', "<link>"],
  ])("rejects %s in the render", (html, reason) => {
    expect(() => clean(html)).toThrow(reason)
  })

  test("writes attribute values canonically and keeps boolean ones bare", () => {
    expect(
      clean(
        '<img alt src="/a.png?w=1&amp;h=2"><input disabled data-select-all title="a &quot;b&quot; > c&#10;d">',
      ),
    ).toBe(
      '<img alt="" src="/a.png?w=1&h=2">\n<input disabled data-select-all title="a &quot;b&quot; > c\nd">',
    )
  })

  test("writes text canonically", () => {
    expect(
      clean("<p>Say &quot;hi&quot; &amp; &lt;b&gt; a&nbsp;b &amp;copy</p>"),
    ).toBe('<p>Say "hi" &amp; &lt;b&gt; a&nbsp;b &amp;copy</p>')
  })

  test("keeps the spaces that render and drops the ones that don't", () => {
    expect(
      clean("<p>\n  Read<a> terms</a> and <strong>Note: </strong>go\n</p>"),
    ).toBe("<p>\nRead<a> terms</a> and <strong>Note: </strong>go\n</p>")
    expect(clean("<p><kbd>A</kbd> <kbd>B</kbd></p>")).toBe(
      "<p><kbd>A</kbd> <kbd>B</kbd></p>",
    )
    expect(clean('<a class="ui-button">\n  Link\n</a>')).toBe(
      '<a class="ui-button">Link</a>',
    )
  })

  test("a comment between inline siblings keeps its spaces", () => {
    expect(clean("<p>a <!-- c --> b</p>")).toBe("<p>a <!-- c -->\nb</p>")
    expect(same("<p>a <!-- c --> b</p>", "<p>a <!-- c -->\nb</p>")).toBe(
      undefined,
    )
  })

  test("keeps pre, textarea and CDATA content as it is", () => {
    expect(clean("<pre>\n\n  a\n    b </pre>")).toBe(
      "<pre>\n\n  a\n    b </pre>",
    )
    expect(clean("<textarea>  a\n b</textarea>")).toBe(
      "<textarea>  a\n b</textarea>",
    )
    expect(clean("<svg><text><![CDATA[x<y]]></text></svg>")).toBe(
      "<svg>\n<text>x&lt;y</text>\n</svg>",
    )
  })

  test("breaks lines before flex and grid items and their container's end", () => {
    expect(
      clean(
        '<label class="ui-checkbox"><input type="checkbox"><span class="ui-label">A</span></label>',
      ),
    ).toBe(
      '<label class="ui-checkbox">\n<input type="checkbox">\n<span class="ui-label">A</span>\n</label>',
    )
    expect(
      clean('<b class="row"><i>a</i><i>b</i></b>', [".row { display: flex }"]),
    ).toBe('<b class="row">\n<i>a</i>\n<i>b</i>\n</b>')
  })

  test("keeps a select's button, selectedcontent and div", () => {
    expect(
      clean(
        '<select><button><selectedcontent></selectedcontent></button><div class="ui-list"><option>a</option></div></select>',
      ),
    ).toBe(
      '<select>\n<button><selectedcontent></selectedcontent></button>\n<div class="ui-list">\n<option>a</option>\n</div>\n</select>',
    )
  })

  test("a custom element is an inline element", () => {
    expect(clean("<p>See <link-card>a</link-card> now</p>")).toBe(
      "<p>See <link-card>a</link-card> now</p>",
    )
  })

  test("blank lines only where the example marks one at the top level", () => {
    expect(
      clean(
        `<p>a</p>\n<!--${BLANK_LINE_MARKER}-->\n<!-- c -->\n<p>b</p>\n\n<div>\n\n<p>c</p>\n</div>`,
      ),
    ).toBe("<p>a</p>\n\n<!-- c -->\n<p>b</p>\n<div>\n<p>c</p>\n</div>")
  })

  test("the output means what the render means", () => {
    const samples = [
      "<p>\n  Read<a> terms</a> and <strong>Note: </strong>go\n</p>",
      '<label class="ui-checkbox"><input type="checkbox"> Default</label>',
      "<p>a&nbsp; <span> b</span><br> c</p>",
      '<span class="ui-tooltip"><button class="ui-button"> Top </button>\n<span popover> Above </span></span>',
    ]
    for (const html of samples) {
      const { markup, nodes } = cleanRender(html)
      expect(
        meaningChange(meaningOf(nodes), meaningOf(parseHtml(markup))),
      ).toBe(undefined)
    }
  })
})

describe("meaningOf", () => {
  test("a sample it must flag: a space that appears", () => {
    expect(same("<p>a<span>b</span></p>", "<p>a <span>b</span></p>")).toContain(
      "became",
    )
  })

  test("a style attribute compares by its declarations", () => {
    expect(
      same(
        '<p style="color: red; gap: 1px;">a</p>',
        '<p style="\n  color: red;\n  gap: 1px\n">a</p>',
      ),
    ).toBe(undefined)
  })

  test("htmlFromRender throws when formatting changes what the HTML renders", async () => {
    await expect(
      htmlFromRender(
        '<span>text<div class="ui-avatar">IJ</div></span>',
        "---\n---\n\n<span>text<div class='ui-avatar'>IJ</div></span>\n",
        "src/component-examples/sample/Example.astro",
      ),
    ).rejects.toThrow("formatting the HTML changed what it renders")
  })
})

describe("markTopLevelBlankLines", () => {
  test("marks the blank lines between top-level nodes, keeping text and bytes", async () => {
    expect(
      await markTopLevelBlankLines(
        '---\nconst a = "é"\n---\n\n<p>é</p>\n\nPrimary\n<p>b</p>\n<script>\n  x()\n</script>\n',
      ),
    ).toBe(
      `---\nconst a = "é"\n---\n\n<p>é</p>\n<!--${BLANK_LINE_MARKER}-->\nPrimary\n<p>b</p>\n<script>\n  x()\n</script>\n`,
    )
  })

  test("leaves blank lines inside elements alone", async () => {
    const source = "---\n---\n\n<div>\n\n<p>a</p>\n</div>\n"
    expect(await markTopLevelBlankLines(source)).toBe(source)
  })
})

describe("htmlText", () => {
  test.each(["a & b", "a<b>c", "x y", "&copy;", "&amp;"])(
    "%s round-trips through the HTML parser",
    (value) => {
      expect(decodeText(htmlText(value))).toBe(value)
    },
  )
})

describe("the HTML examples", () => {
  const files = globSync("src/component-examples/**/*.html")
    .filter((file) => existsSync(file.replace(/\.html$/, ".astro")))
    .toSorted()

  test("have a blank line at the top level where the source has one", async () => {
    const problems: string[] = []
    for (const file of files) {
      const astro = file.replace(/\.html$/, ".astro")
      const { blankLines } = await readExample(
        readFileSync(astro, "utf8"),
        astro,
      )
      const nodes = parseHtml(readFileSync(file, "utf8")).filter(
        (node: { tag?: string }) =>
          !["script", "style"].includes(node.tag ?? ""),
      )
      const content = nodes.flatMap(
        (node: { type: string; value?: string }, index: number) =>
          node.type === "text" && /^\s*$/.test(node.value ?? "") ? [] : [index],
      )
      const html = nodes.filter(
        (node: { type: string; value?: string }, index: number) =>
          node.type === "text" &&
          index > content[0] &&
          index < content.at(-1)! &&
          /\n[^\S\n]*\n/.test(node.value ?? ""),
      ).length
      const source = blankLines.filter(Boolean).length
      if (html !== source)
        problems.push(`${file}: ${html} blank lines, the source has ${source}`)
    }
    expect(problems).toEqual([])
  }, 60_000)
})
