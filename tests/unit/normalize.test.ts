import { describe, expect, test } from "vitest"
import { normalize } from "./normalize"

const inBlock = (html: string) => `<div>${html}</div>`

describe("normalize", () => {
  test.each([
    ["<kbd>A</kbd> <kbd>B</kbd>", "<kbd>A</kbd><kbd>B</kbd>"],
    ["Read<em> more</em>", "Read<em>more</em>"],
    ["Read <em>more</em>", "Read<em> more</em>"],
    ["a&nbsp;b", "a b"],
    ["<pre>a\nb</pre>", "<pre>a b</pre>"],
    ["<pre>a  b</pre>", "<pre>a b</pre>"],
    ["<textarea> a</textarea>", "<textarea>a</textarea>"],
    [
      "<select><button><selectedcontent></selectedcontent></button><option>a</option></select>",
      "<select><option>a</option></select>",
    ],
    ["a &amp;lt; b", "a &lt; b"],
    [
      'Save <span class="ui-button">a</span>',
      'Save<span class="ui-button">a</span>',
    ],
  ])("%s and %s differ", (a, b) => {
    expect(normalize(inBlock(a))).not.toBe(normalize(inBlock(b)))
  })

  test.each([
    [
      '<span class="ui-button"> Save </span>',
      '<span class="ui-button">Save</span>',
    ],
    [
      '<div class="example-row">\n  <button>a</button>\n  <button>b</button>\n</div>',
      '<div class="example-row"><button>a</button><button>b</button></div>',
    ],
    ["<p>\n  a\n  b\n</p>", "<p>a b</p>"],
    ["<p>a <b> b</b></p>", "<p>a <b>b</b></p>"],
    ["a<!-- -->b", "ab"],
    ["<!--[-->a<!--]-->", "a"],
    ['<p class="b  a">x</p>', '<p class="a b">x</p>'],
    ["<ul>\n  <li>a</li>\n</ul>", "<ul><li>a</li></ul>"],
  ])("%s and %s stay equal", (a, b) => {
    expect(normalize(inBlock(a))).toBe(normalize(inBlock(b)))
  })

  test("compares comments only when asked", () => {
    expect(normalize("<p>a<!-- x -->b</p>", { comments: true })).not.toBe(
      normalize("<p>ab</p>", { comments: true }),
    )
  })

  test("marks the spaces that render", () => {
    expect(
      normalize(
        '<p>Press <kbd>A</kbd> <kbd>B</kbd>, then <a href="#x">go&nbsp;on</a>.</p>',
      ),
    ).toBe(
      [
        "<p>",
        "  Press␣",
        "  <kbd>A</kbd>",
        "  ␣",
        "  <kbd>B</kbd>",
        "  , then␣",
        '  <a href="#x">go&nbsp;on</a>',
        "  .",
        "</p>",
        "",
      ].join("\n"),
    )
  })

  test("writes preformatted text as a string", () => {
    expect(normalize("<pre>  a\n  b</pre>")).toBe('<pre>"  a\\n  b"</pre>\n')
  })

  test("example CSS decides which spaces render", () => {
    const html = '<div class="row"><b>a</b> <b>b</b></div>'
    expect(normalize(html)).toContain("␣")
    expect(normalize(html, { css: [".row { display: flex }"] })).not.toContain(
      "␣",
    )
  })
})
