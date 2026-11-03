import { globSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import { parseHtml, serialize } from "../../scripts/html-tokens.mjs"

const htmlFiles = globSync("src/component-examples/**/*.html").toSorted()

describe("parseHtml", () => {
  test("every committed HTML example parses back to the same bytes", () => {
    expect(htmlFiles.length).toBeGreaterThan(100)
    const changed = htmlFiles.filter((file) => {
      const source = readFileSync(file, "utf8")
      return serialize(parseHtml(source)) !== source
    })
    expect(changed).toEqual([])
  })

  test("keeps the button, selectedcontent and div inside a select", () => {
    const [select] = parseHtml(
      '<select><button><selectedcontent></selectedcontent></button><div class="ui-list"><option>a</option></div></select>',
    )
    expect(select.children.map(({ tag }: { tag: string }) => tag)).toEqual([
      "button",
      "div",
    ])
    expect(select.children[0].children[0].tag).toBe("selectedcontent")
  })

  test("decodes text and attribute values and keeps the source", () => {
    const source = '<p title="a &amp; b">Tom &amp; Jerry&nbsp;</p>'
    const [p] = parseHtml(source)
    expect(p.attrs).toEqual([
      { name: "title", raw: 'title="a &amp; b"', value: "a & b" },
    ])
    expect(p.children[0]).toMatchObject({
      raw: "Tom &amp; Jerry&nbsp;",
      value: "Tom & Jerry ",
    })
    expect(serialize(parseHtml(source))).toBe(source)
  })

  test("drops the first newline of pre and textarea from the value only", () => {
    const [pre, , textarea] = parseHtml(
      "<pre>\nline</pre>\n<textarea>\n<b>x</b></textarea>",
    )
    expect(pre.children[0]).toMatchObject({ raw: "\nline", value: "line" })
    expect(textarea.children).toEqual([
      expect.objectContaining({ type: "text", value: "<b>x</b>" }),
    ])
  })

  test("reads script and style as text", () => {
    const [script, style] = parseHtml(
      '<script>if (a < b) document.write("</p>")</script><style>a > b {}</style>',
    )
    expect(script.children[0].value).toBe('if (a < b) document.write("</p>")')
    expect(style.children[0].value).toBe("a > b {}")
  })

  test("follows SVG names and HTML inside foreignObject", () => {
    const [svg] = parseHtml(
      '<svg viewBox="0 0 1 1"><foreignObject><p>a</p></foreignObject><path d=""/><text><![CDATA[x<y]]></text></svg>',
    )
    expect(svg.attrs[0].name).toBe("viewBox")
    expect(svg.children.map(({ tag }: { tag: string }) => tag)).toEqual([
      "foreignObject",
      "path",
      "text",
    ])
    expect(svg.children[2].children[0].value).toBe("x<y")
  })

  test("keeps comments, including the <!> Svelte writes", () => {
    const nodes = parseHtml("a<!-- b --><!>c")
    expect(nodes.map(({ type }: { type: string }) => type)).toEqual([
      "text",
      "comment",
      "comment",
      "text",
    ])
  })

  test("accepts an attribute repeated with the same value", () => {
    const source = '<option selected="" value="a" selected="">A</option>'
    expect(serialize(parseHtml(source))).toBe(source)
  })

  test.each([
    ["<div></span>", "</span> closes <div>"],
    ["</p>", "a stray </p>"],
    ["<div>", "an unclosed <div>"],
    ["<div/>", "a self-closing <div/>"],
    ["<!DOCTYPE html>", "a <!DOCTYPE>"],
    ["<ul><li>a<li>b</ul>", "</ul> closes <li>"],
    [
      '<option value="a" value="b">A</option>',
      "the attribute value twice with different values on <option>",
    ],
    ["<p>a<div>b</div></p>", "the HTML parser builds a different tree"],
    [
      "<table><tr><td>a</td></tr></table>",
      "the HTML parser builds a different tree at <table> > <tr>",
    ],
    ["<a href=a<b>", "the parse error"],
  ])("rejects %s", (source, reason) => {
    expect(() => parseHtml(source)).toThrow(reason)
  })
})
