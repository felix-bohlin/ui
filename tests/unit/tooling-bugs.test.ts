import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { pathToFileURL } from "node:url"
import { convertToTSX } from "@astrojs/compiler"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { parseFragment } from "parse5"
import { describe, expect, test } from "vitest"
import { createRenderer, defineComponent, h, nextTick, ref } from "vue"
import { compileTemplate } from "vue/compiler-sfc"
import BooleanSpread from "./fixtures/BooleanSpread.astro"
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
        "packages/opui/components/SelectButton/SelectButton.astro, which renders <selectedcontent> through the variable tag SelectedContent",
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

  test('Astro writes multiple="true" for a true boolean attribute it doesn\'t list', async () => {
    const container = await AstroContainer.create()
    expect(
      await container.renderToString(BooleanSpread),
      fixed(
        'attributeOf in scripts/example-html.mjs and normalizeAttribute in tests/unit/normalize.ts, which read a boolean attribute with the value "true" as the bare attribute',
      ),
    ).toContain('multiple="true"')
  })

  test("Vue takes <search> for a component it can't resolve", () => {
    const { code } = compileTemplate({
      filename: "Search.vue",
      id: "search",
      source: "<search><form></form></search>",
    })
    expect(
      code,
      fixed(
        'VUE_UNKNOWN_TAGS in scripts/build-examples.mjs, which writes <search> as <component is="search"> in Vue',
      ),
    ).toContain("resolveComponent")
  })

  test("Vue keeps the attributes a component passed through to a component root once they are all removed", async () => {
    type Node = {
      children: Node[]
      parent?: Node
      props: Record<string, unknown>
      tag: string
      text?: string
    }
    const node = (tag: string, text?: string): Node => ({
      children: [],
      props: {},
      tag,
      text,
    })
    const { createApp } = createRenderer<Node, Node>({
      createComment: (text) => node("#comment", text),
      createElement: (tag) => node(tag),
      createText: (text) => node("#text", text),
      insert: (child, parent, anchor) => {
        child.parent = parent
        const index = anchor ? parent.children.indexOf(anchor) : -1
        if (index < 0) parent.children.push(child)
        else parent.children.splice(index, 0, child)
      },
      nextSibling: (child) =>
        child.parent?.children[child.parent.children.indexOf(child) + 1] ??
        null,
      parentNode: (child) => child.parent ?? null,
      patchProp: (element, key, _previous, next) => {
        if (next == null) delete element.props[key]
        else element.props[key] = next
      },
      remove: (child) => {
        child.parent?.children.splice(child.parent.children.indexOf(child), 1)
      },
      setElementText: (element, text) => {
        element.text = text
      },
      setText: (child, text) => {
        child.text = text
      },
    })
    const Inner = defineComponent({
      props: ["class"],
      template: '<span :class="$props.class"><slot /></span>',
    })
    const Outer = defineComponent({
      components: { Inner },
      props: ["tone"],
      template: '<Inner :class="tone"><slot /></Inner>',
    })
    const attrs = ref<Record<string, string>>({ title: "Hint" })
    const root = node("root")
    createApp({ render: () => h(Outer, attrs.value) }).mount(root)
    const span = () => root.children.find((child) => child.tag === "span")
    expect(span()?.props.title).toBe("Hint")
    attrs.value = {}
    await nextTick()
    expect(
      span()?.props.title,
      fixed(
        'componentRoot in scripts/component-vue.mjs, which gives a component whose root is another component inheritAttrs: false and v-bind="$attrs" on that root (Badge, Tooltip)',
      ),
    ).toBe("Hint")
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
