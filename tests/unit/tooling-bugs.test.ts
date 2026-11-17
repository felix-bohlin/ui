import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { pathToFileURL } from "node:url"
import { convertToTSX } from "@astrojs/compiler"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { parseFragment } from "parse5"
import { describe, expect, test } from "vitest"
import EmptyUnknown from "./fixtures/EmptyUnknown.astro"
import UndefinedSpread from "./fixtures/UndefinedSpread.astro"

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

  test("Astro lets an undefined spread value remove an attribute set before it on a dynamic tag or a custom element, but not on a static tag", async () => {
    const container = await AstroContainer.create()
    const html = await container.renderToString(UndefinedSpread)
    const roleOf = (shape: string) =>
      new RegExp(`<[^>]*data-shape="${shape}"[^>]*data-state="set"`).test(html)
    expect(roleOf("static")).toBe(true)
    expect(
      [roleOf("dynamic"), roleOf("custom")],
      fixed(
        "the defined(rest) spreads in the Avatar, Button, Chip, Copy, Fieldset, ListItem, SortableTable and Toaster Astro files",
      ),
    ).toEqual([false, false])
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

  test("@astrojs/compiler types Astro.props as any when Props has an `as` key", async () => {
    const { code } = await convertToTSX(
      '---\ntype Props = { as?: "p" | "div" }\n\nconst { as: Tag = "p" } = Astro.props\n---\n\n<Tag />\n',
      { filename: "Polymorphic.astro" },
    )
    expect(code).toContain("type Props")
    expect(
      code,
      fixed(
        'src/components/Conditional.astro, which writes its Props as Partial<Record<"as", ...>>',
      ),
    ).toContain("_props: Record<string, any>")
  })

  test("Lightning CSS folds animation-timeline into the animation shorthand when Astro minifies", () => {
    const astro = createRequire(import.meta.url).resolve("astro/package.json")
    const vite = createRequire(astro).resolve("vite")
    const { transform } = createRequire(vite)("lightningcss")
    expect(
      readFileSync(
        new URL("dist/core/build/vite-build-config.js", pathToFileURL(astro)),
        "utf-8",
      ),
    ).toContain('target: "esnext"')
    expect(
      transform({
        code: Buffer.from(
          ".a{animation:fill linear both;animation-timeline:scroll(root)}",
        ),
        filename: "a.css",
        minify: true,
      }).code.toString(),
      fixed(
        "the components that write animation-* longhands, and the timeline shorthand problem in scripts/check-dist.mjs",
      ),
    ).toBe(".a{animation:linear both fill scroll(root)}")
  })

  test("Lightning CSS rejects an anchored() container query", () => {
    const astro = createRequire(import.meta.url).resolve("astro/package.json")
    const vite = createRequire(astro).resolve("vite")
    const { transform } = createRequire(vite)("lightningcss")
    expect(
      () =>
        transform({
          code: Buffer.from(
            "@container anchored(fallback: flip-inline){.a{color:red}}",
          ),
          filename: "a.css",
        }),
      fixed(
        "packages/opui/css/components/menu.css, the inset formula for submenus of submenus",
      ),
    ).toThrow('Function("anchored")')
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
