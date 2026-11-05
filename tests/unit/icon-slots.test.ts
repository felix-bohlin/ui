import { experimental_AstroContainer as AstroContainer } from "astro/container"
import type { AstroInstance } from "astro"
import { parseFragment, type DefaultTreeAdapterMap } from "parse5"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"

type Element = DefaultTreeAdapterMap["element"]
type Node = DefaultTreeAdapterMap["childNode"] | Element

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
)
const components = import.meta.glob<unknown>(
  "../../packages/opui/components/*/*.{astro,react.tsx,svelte,vue}",
  { import: "default" },
)

const cases = [
  {
    file: "Dialog/DialogHeader",
    props: { closeLabel: "Close" },
    slots: ["close-icon"],
  },
  { file: "Drawer/DrawerHeader", props: {}, slots: ["close-icon"] },
  {
    file: "NumberField/NumberField",
    props: { label: "Quantity" },
    slots: ["decrease-icon", "increase-icon"],
  },
  {
    file: "TextField/TextField",
    props: { label: "Password", passwordToggle: true, type: "password" },
    slots: ["icon-checked", "icon-unchecked"],
    wrapped: true,
  },
]

const icon = '<svg data-icon="custom"></svg>'
const camel = (name: string) =>
  name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

const container = await AstroContainer.create()
const renderers = {
  astro: (component: unknown, props: Record<string, unknown>, slot?: string) =>
    container.renderToString(component as AstroInstance["default"], {
      props,
      slots: slot ? { [slot]: icon } : {},
    }),
  "react.tsx": async (
    component: unknown,
    props: Record<string, unknown>,
    slot?: string,
  ) =>
    renderReact(
      createElement(component as ComponentType, {
        ...props,
        ...(slot && {
          [camel(slot)]: createElement("svg", { "data-icon": "custom" }),
        }),
      }),
    ),
  svelte: async (
    component: unknown,
    props: Record<string, unknown>,
    slot?: string,
  ) =>
    renderSvelte(component as SvelteComponent, {
      props: {
        ...props,
        ...(slot && {
          [camel(slot)]: createRawSnippet(() => ({ render: () => icon })),
        }),
      },
    }).body,
  vue: (component: unknown, props: Record<string, unknown>, slot?: string) =>
    renderVue(
      createSSRApp({
        render: () =>
          h(
            component as VueComponent,
            props,
            slot ? { [slot]: () => h("svg", { "data-icon": "custom" }) } : {},
          ),
      }),
    ),
}

const elements = (node: Node): Element[] =>
  "childNodes" in node
    ? [
        ...("tagName" in node ? [node as Element] : []),
        ...node.childNodes.flatMap((child) => elements(child as Node)),
      ]
    : []
const attribute = (element: Element, name: string) =>
  element.attrs.find((attr) => attr.name === name)?.value ?? ""
const classes = (element: Element) => attribute(element, "class").split(/\s+/)

const problemsOf = (
  html: string,
  defaults: string,
  slot: string,
  wrapped = false,
) => {
  const all = elements(parseFragment(html) as unknown as Node)
  const svgs = (source: Element[]) =>
    source.filter((el) => el.tagName === "svg")
  const custom = svgs(all).filter(
    (el) => attribute(el, "data-icon") === "custom",
  )
  const found: string[] = []
  if (custom.length !== 1) found.push(`renders ${custom.length} custom icons`)
  const before = svgs(elements(parseFragment(defaults) as unknown as Node))
  if (svgs(all).length !== before.length) {
    found.push(`renders ${svgs(all).length} icons instead of ${before.length}`)
  }
  const parent = custom[0]?.parentNode as Element | undefined
  const button = wrapped ? (parent?.parentNode as Element | undefined) : parent
  if (wrapped && (!parent || !classes(parent).includes(`ui-${slot}`))) {
    found.push(`doesn't wrap the icon in .ui-${slot}`)
  }
  if (!button || !classes(button).includes("ui-button")) {
    found.push("doesn't put the icon in the button")
  }
  return found
}

test("every slot that replaces a control's icon has a case", () => {
  const iconSlots = apis.flatMap((api) =>
    api.parts
      .flatMap((part) => part.slots ?? [])
      .filter((slot) => slot.endsWith("-icon"))
      .map((slot) => `${api.source}/${api.component} ${slot}`),
  )
  const covered = cases.flatMap(({ file, slots }) =>
    slots.map((slot) => `${file} ${slot}`),
  )
  expect(iconSlots.filter((slot) => !covered.includes(slot))).toEqual([])
})

test("the check flags an icon added next to the default", () => {
  const defaults = '<button class="ui-button"><svg></svg></button>'
  expect(
    problemsOf(
      `<button class="ui-button"><svg></svg>${icon}</button>`,
      defaults,
      "close-icon",
    ),
  ).toEqual(["renders 2 icons instead of 1"])
  expect(
    problemsOf(
      `<button class="ui-button">${icon}</button>`,
      defaults,
      "close-icon",
    ),
  ).toEqual([])
})

describe.each(cases)("$file", ({ file, props, slots, wrapped }) => {
  test.each(Object.entries(renderers))(
    "%s replaces the default icon with the slot",
    async (extension, render) => {
      const component =
        await components[
          `../../packages/opui/components/${file}.${extension}`
        ]()
      const defaults = await render(component, props)
      const found: string[] = []
      for (const slot of slots) {
        const html = await render(component, props, slot)
        found.push(
          ...problemsOf(html, defaults, slot, wrapped).map(
            (problem) => `${slot}: ${problem}`,
          ),
        )
      }
      expect(found).toEqual([])
    },
  )
})
