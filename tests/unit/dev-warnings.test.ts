import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import type { Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeEach, describe, expect, test, vi } from "vitest"
import CheckboxAstro from "../../packages/opui/components/Checkbox/Checkbox.astro"
import CheckboxReact from "../../packages/opui/components/Checkbox/Checkbox.react"
import CheckboxSvelte from "../../packages/opui/components/Checkbox/Checkbox.svelte"
import CheckboxVue from "../../packages/opui/components/Checkbox/Checkbox.vue"
import DialogReact from "../../packages/opui/components/Dialog/Dialog.react"
import DialogVue from "../../packages/opui/components/Dialog/Dialog.vue"
import DialogHeaderReact from "../../packages/opui/components/Dialog/DialogHeader.react"
import DialogHeaderVue from "../../packages/opui/components/Dialog/DialogHeader.vue"
import DrawerReact from "../../packages/opui/components/Drawer/Drawer.react"
import DrawerVue from "../../packages/opui/components/Drawer/Drawer.vue"
import DrawerTitleReact from "../../packages/opui/components/Drawer/DrawerTitle.react"
import DrawerTitleVue from "../../packages/opui/components/Drawer/DrawerTitle.vue"
import RadioAstro from "../../packages/opui/components/Radio/Radio.astro"
import RadioReact from "../../packages/opui/components/Radio/Radio.react"
import RadioSvelte from "../../packages/opui/components/Radio/Radio.svelte"
import RadioVue from "../../packages/opui/components/Radio/Radio.vue"
import SwitchAstro from "../../packages/opui/components/Switch/Switch.astro"
import SwitchReact from "../../packages/opui/components/Switch/Switch.react"
import SwitchSvelte from "../../packages/opui/components/Switch/Switch.svelte"
import SwitchVue from "../../packages/opui/components/Switch/Switch.vue"
import ReplacedIdsAstro from "./fixtures/ReplacedIds.astro"
import ReplacedIdsSvelte from "./fixtures/ReplacedIds.svelte"

const container = await AstroContainer.create()

type Renderers = {
  astro: Parameters<typeof container.renderToString>[0]
  react: ComponentType<Record<string, unknown>>
  svelte: SvelteComponent<Record<string, unknown>>
  vue: VueComponent
}

const render = {
  astro: (component: Renderers["astro"], props: Record<string, unknown>) =>
    container.renderToString(component, { props }),
  react: async (
    component: Renderers["react"],
    props: Record<string, unknown>,
  ) => renderReact(createElement(component, props)),
  svelte: async (
    component: Renderers["svelte"],
    props: Record<string, unknown>,
  ) => renderSvelte(component, { props }).body,
  vue: (component: Renderers["vue"], props: Record<string, unknown>) =>
    renderVue(createSSRApp({ render: () => h(component, props) })),
}

const CONTROLS: Record<string, Renderers> = {
  Checkbox: {
    astro: CheckboxAstro,
    react: CheckboxReact as Renderers["react"],
    svelte: CheckboxSvelte as Renderers["svelte"],
    vue: CheckboxVue,
  },
  Radio: {
    astro: RadioAstro,
    react: RadioReact as Renderers["react"],
    svelte: RadioSvelte as Renderers["svelte"],
    vue: RadioVue,
  },
  Switch: {
    astro: SwitchAstro,
    react: SwitchReact as Renderers["react"],
    svelte: SwitchSvelte as Renderers["svelte"],
    vue: SwitchVue,
  },
}

const FRAMEWORKS = ["astro", "react", "svelte", "vue"] as const

const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
const warnings = () => warn.mock.calls.map(([message]) => String(message))

beforeEach(() => {
  warn.mockClear()
})

afterAll(() => {
  warn.mockRestore()
})

describe.each(Object.entries(CONTROLS))("%s", (name, components) => {
  test.each(FRAMEWORKS)(
    "%s warns when it has no accessible name",
    async (framework) => {
      await render[framework](components[framework] as never, { value: "a" })
      expect(warnings()).toEqual([
        `[OPUI ${name}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s doesn't warn when a label or aria-label names it",
    async (framework) => {
      await render[framework](components[framework] as never, {
        label: "Named",
        value: "a",
      })
      await render[framework](components[framework] as never, {
        "aria-label": "Named",
        value: "a",
      })
      expect(warnings()).toEqual([])
    },
  )
})

const replacedIds = {
  astro: (labelledby?: string) =>
    container.renderToString(ReplacedIdsAstro, { props: { labelledby } }),
  react: async (labelledby?: string) =>
    renderReact(
      createElement(
        "div",
        null,
        createElement(
          DialogReact,
          { "aria-labelledby": labelledby },
          createElement(DialogHeaderReact, { id: "own-header" }, "Header"),
        ),
        createElement(
          DrawerReact,
          { "aria-labelledby": labelledby, id: "drawer" },
          createElement(DrawerTitleReact, { id: "own-title" }, "Title"),
        ),
      ),
    ),
  svelte: async (labelledby?: string) =>
    renderSvelte(ReplacedIdsSvelte, { props: { labelledby } }).body,
  vue: (labelledby?: string) =>
    renderVue(
      createSSRApp({
        render: () => [
          h(DialogVue, { "aria-labelledby": labelledby }, () =>
            h(DialogHeaderVue, { id: "own-header" }, () => "Header"),
          ),
          h(DrawerVue, { "aria-labelledby": labelledby, id: "drawer" }, () =>
            h(DrawerTitleVue, { id: "own-title" }, () => "Title"),
          ),
        ],
      }),
    ),
}

describe("DialogHeader and DrawerTitle ids", () => {
  test.each(FRAMEWORKS)(
    "%s replaces an own id with the generated one and warns",
    async (framework) => {
      const html = await replacedIds[framework]()
      expect(html).not.toContain('id="own-header"')
      expect(html).not.toContain('id="own-title"')
      expect(warnings()).toEqual([
        "[OPUI DialogHeader] `id` is replaced by the dialog's generated id; pass `aria-labelledby` on the Dialog to keep it.",
        "[OPUI DrawerTitle] `id` is replaced by the drawer's generated id; pass `aria-labelledby` on the Drawer to keep it.",
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s keeps the id without a warning when the root has aria-labelledby",
    async (framework) => {
      const html = await replacedIds[framework]("own-header")
      expect(html).toContain('id="own-header"')
      expect(html).toContain('id="own-title"')
      expect(warnings()).toEqual([])
    },
  )
})
