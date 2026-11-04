import { readFileSync } from "node:fs"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { parseFragment } from "parse5"
import { describe, expect, test } from "vitest"
import EmptyUnknown from "./fixtures/EmptyUnknown.astro"

const fixed = (workaround: string) =>
  `fixed upstream: remove the workaround in ${workaround}, then this entry`

describe("tooling bugs the generator and the components work around", () => {
  test("Astro drops the end tag of an empty element it doesn't know", async () => {
    const container = await AstroContainer.create()
    expect(
      await container.renderToString(EmptyUnknown),
      fixed(
        "packages/opui/components/Select/Select.astro, which renders <selectedcontent> through the variable tag SelectedContent",
      ),
    ).not.toContain("</selectedcontent>")
  })

  test("Astro's dev CSS collector compiles the files behind ?raw imports", () => {
    const source = readFileSync(
      new URL(
        "../../node_modules/astro/dist/vite-plugin-css/index.js",
        import.meta.url,
      ),
      "utf-8",
    )
    const walk = source.slice(
      source.indexOf("async function ensureModulesLoaded"),
      source.indexOf("function* collectCSSWithOrder"),
    )
    expect(walk).toContain("importedModules")
    expect(
      walk,
      fixed("astro.config.mjs, the opui-raw-without-module-edge plugin"),
    ).not.toMatch(/raw/i)
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
})
