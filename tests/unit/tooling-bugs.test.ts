import { parse } from "@astrojs/compiler"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { parseFragment } from "parse5"
import { format, resolveConfig } from "prettier"
import { describe, expect, test } from "vitest"
import EmptyUnknown from "./fixtures/EmptyUnknown.astro"

const fixed = (workaround: string) =>
  `fixed upstream: remove the workaround in ${workaround}, then this entry`

describe("tooling bugs the generator and the components work around", () => {
  test("@astrojs/compiler cuts the raw text of a quoted attribute with a character reference", async () => {
    const { ast } = await parse('<a title="a &amp; b">t</a>', {
      position: true,
    })
    const [element] = ast.children
    const [attribute] = element.type === "element" ? element.attributes : []
    expect(attribute.value).toBe("a & b")
    expect(
      attribute.raw,
      fixed(
        "scripts/astro-attributes.mjs, which reads the attribute from the source bytes instead of raw",
      ),
    ).not.toMatch(/^"?a &amp; b"?$/)
  })

  test("Astro drops the end tag of an empty element it doesn't know", async () => {
    const container = await AstroContainer.create()
    expect(
      await container.renderToString(EmptyUnknown),
      fixed(
        "packages/opui/components/Select/Select.astro, which renders <selectedcontent> through the variable tag SelectedContent",
      ),
    ).not.toContain("</selectedcontent>")
  })

  test("parse5 drops the button and div inside a select", () => {
    const [select] = parseFragment(
      "<select><button><selectedcontent></selectedcontent></button><div><option>a</option></div></select>",
    ).childNodes
    expect(
      "childNodes" in select
        ? select.childNodes.map((node) => node.nodeName)
        : [],
      fixed(
        "scripts/html-tokens.mjs, where browserView and parse5View skip the children of a select",
      ),
    ).toEqual(["option"])
  })

  test("Prettier's Astro plugin writes a quoted attribute value decoded", async () => {
    const file = "src/component-examples/sample/Sample.astro"
    expect(
      await format('<a title="&amp;copy" href="?a=1&amp;b=2">t</a>\n', {
        ...(await resolveConfig(file)),
        filepath: file,
      }),
      fixed(
        "scripts/astro-attributes.mjs and tests/unit/astro-attributes.test.ts, which reject quoted attribute values with character references",
      ),
    ).toContain('title="&copy" href="?a=1&b=2"')
  })
})
