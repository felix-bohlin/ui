import type { Component as SvelteComponent } from "svelte"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { formatCode } from "../../scripts/format.mjs"
import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import { normalize } from "./normalize"

const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)

const sources = import.meta.glob<string>(
  "../../packages/opui/components/*/*.{astro,svelte,vue}",
  { eager: true, import: "default", query: "?raw" },
)

const PREFIX = "../../"

const WIDTHS = [40, 200]

const TEXT = "Text"

const SLOT_CONTENT: Record<string, string> = {
  Table: "<tbody><tr><td>Text</td></tr></tbody>",
  TableBody: "<tr><td>Text</td></tr>",
  TableColumnGroup: "<col>",
  TableFoot: "<tr><td>Text</td></tr>",
  TableHead: "<tr><td>Text</td></tr>",
  TableRow: "<td>Text</td>",
}

const contentOf = (name: string) => SLOT_CONTENT[name] ?? TEXT

type Node = ReturnType<typeof parseHtml>[number]

const vnodes = (nodes: Node[]): unknown[] =>
  nodes.flatMap((node) =>
    node.type === "text"
      ? [node.value]
      : node.type === "element"
        ? [
            h(
              node.tag,
              Object.fromEntries(
                node.attrs.map(
                  ({ name, value }: { name: string; value: string }) => [
                    name,
                    value,
                  ],
                ),
              ),
              vnodes(node.children),
            ),
          ]
        : [],
  )

const props = { required: true }

const slotsOf = (name: string) => {
  const api = Object.values(apis).find((api) => api.component === name)
  return [
    ...new Set([
      "default",
      ...(api?.slots ?? []).map(({ name }) => name),
      ...(api?.parts ?? []).flatMap((part) => part.slots ?? []),
    ]),
  ].toSorted()
}

const CASES = Object.keys(sources)
  .map((path) => path.slice(PREFIX.length))
  .toSorted()
  .map((file) => {
    const [, name, extension] = /\/([^/]+)\.(astro|svelte|vue)$/.exec(file)!
    return { extension, file, name, slots: slotsOf(name) }
  })

let renderer: Awaited<ReturnType<typeof createRenderer>>
let svelte: typeof import("svelte")
let svelteServer: typeof import("svelte/server")

const skipped: string[] = []

beforeAll(async () => {
  renderer = await createRenderer()
  svelte = (await renderer.loadModule("svelte")) as typeof import("svelte")
  svelteServer = (await renderer.loadModule(
    "svelte/server",
  )) as typeof import("svelte/server")
}, 60_000)

afterAll(() => renderer.close())

const render = {
  astro: (file: string, source: string, slots: string[], name: string) =>
    renderer.renderSource(file, source, {
      props,
      slots: Object.fromEntries(slots.map((slot) => [slot, contentOf(name)])),
    }),
  svelte: async (
    file: string,
    source: string,
    slots: string[],
    name: string,
  ) => {
    const { default: component } = (await renderer.loadSource(
      file,
      source,
    )) as { default: SvelteComponent<Record<string, unknown>> }
    return svelteServer.render(component, {
      props: {
        ...props,
        ...Object.fromEntries(
          slots.map((slot) => [
            slotProp(slot),
            svelte.createRawSnippet(() => ({ render: () => contentOf(name) })),
          ]),
        ),
      },
    }).body
  },
  vue: async (file: string, source: string, slots: string[], name: string) => {
    const { default: component } = (await renderer.loadSource(
      file,
      source,
    )) as { default: VueComponent }
    return renderVue(
      createSSRApp({
        render: () =>
          h(
            component,
            props,
            Object.fromEntries(
              slots.map((slot) => [
                slot,
                () => vnodes(parseHtml(contentOf(name))),
              ]),
            ),
          ),
      }),
    )
  },
}

const formatted = async (file: string, printWidth: number) =>
  formatCode(sources[`${PREFIX}${file}`], file, { printWidth })

const variant = (file: string, width: number) =>
  file.replace(/\.(astro|svelte|vue)$/, `.w${width}.$1`)

describe("a component renders the same however oxfmt wraps its source", () => {
  test("covers the components", () => {
    expect(CASES.length).toBeGreaterThan(200)
    expect(new Set(CASES.map(({ extension }) => extension))).toEqual(
      new Set(["astro", "svelte", "vue"]),
    )
  })

  test.each(CASES)(
    "$file",
    async ({ extension, file, name, slots }) => {
      const ssr = render[extension as keyof typeof render]
      let expected: string
      try {
        expected = normalize(
          await ssr(variant(file, 0), sources[`${PREFIX}${file}`], slots, name),
        )
      } catch (error) {
        skipped.push(`${file}: ${(error as Error).message.split("\n")[0]}`)
        return
      }
      for (const width of WIDTHS) {
        const html = await ssr(
          variant(file, width),
          await formatted(file, width),
          slots,
          name,
        )
        expect
          .soft(
            normalize(html),
            `${name}: the ${extension} source formatted at printWidth ${width} renders differently; trim the slot edges with trimEdges() from components/whitespace.ts in Astro or <TrimmedSlot> from components/whitespace.vue.ts in Vue, or keep the markup around the slot on one line`,
          )
          .toBe(expected)
      }
    },
    60_000,
  )

  test("renders every component", () => {
    expect(skipped.join("\n")).toBe("")
  })

  test("a sample the check must flag: a space that a line break adds", async () => {
    const file = "packages/opui/components/Checkbox/Sample.astro"
    const source = (gap: string) =>
      `---\nconst { label } = Astro.props\n---\n\n<label class="ui-checkbox"><input required type="checkbox" /><span class="ui-label">{label}${gap}<slot /></span></label>\n`
    const tight = await renderer.renderSource(file, source(""), {
      props: { label: "L" },
      slots: { default: TEXT },
    })
    const broken = await renderer.renderSource(
      file.replace(".astro", ".gap.astro"),
      source("\n  "),
      { props: { label: "L" }, slots: { default: TEXT } },
    )
    expect(normalize(broken)).not.toBe(normalize(tight))
  })
})
