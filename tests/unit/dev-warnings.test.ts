import { createElement } from "react"
import { h } from "vue"
import { afterAll, beforeEach, describe, expect, test, vi } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import CheckboxAstro from "../../packages/opui/components/Checkbox/Checkbox.astro"
import CheckboxReact from "../../packages/opui/components/Checkbox/Checkbox.react"
import CheckboxSvelte from "../../packages/opui/components/Checkbox/Checkbox.svelte"
import CheckboxVue from "../../packages/opui/components/Checkbox/Checkbox.vue"
import DialogReact from "../../packages/opui/components/Dialog/Dialog.react"
import DialogVue from "../../packages/opui/components/Dialog/Dialog.vue"
import DialogHeaderAstro from "../../packages/opui/components/Dialog/DialogHeader.astro"
import DialogHeaderReact from "../../packages/opui/components/Dialog/DialogHeader.react"
import DialogHeaderSvelte from "../../packages/opui/components/Dialog/DialogHeader.svelte"
import DialogHeaderVue from "../../packages/opui/components/Dialog/DialogHeader.vue"
import DialogTitleReact from "../../packages/opui/components/Dialog/DialogTitle.react"
import DialogTitleVue from "../../packages/opui/components/Dialog/DialogTitle.vue"
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
import ToggleGroupAstro from "../../packages/opui/components/ToggleGroup/ToggleGroup.astro"
import ToggleGroupReact from "../../packages/opui/components/ToggleGroup/ToggleGroup.react"
import ToggleGroupSvelte from "../../packages/opui/components/ToggleGroup/ToggleGroup.svelte"
import ToggleGroupVue from "../../packages/opui/components/ToggleGroup/ToggleGroup.vue"
import ReplacedIdsAstro from "./fixtures/ReplacedIds.astro"
import ReplacedIdsSvelte from "./fixtures/ReplacedIds.svelte"
import { render } from "./renderers"

const CONTROLS: Record<string, Record<ComponentFramework, unknown>> = {
  Checkbox: {
    astro: CheckboxAstro,
    react: CheckboxReact,
    svelte: CheckboxSvelte,
    vue: CheckboxVue,
  },
  Radio: {
    astro: RadioAstro,
    react: RadioReact,
    svelte: RadioSvelte,
    vue: RadioVue,
  },
  Switch: {
    astro: SwitchAstro,
    react: SwitchReact,
    svelte: SwitchSvelte,
    vue: SwitchVue,
  },
}

const FRAMEWORKS = Object.keys(render) as ComponentFramework[]

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
      await render[framework](components[framework], { value: "a" })
      expect(warnings()).toEqual([
        `[OPUI ${name}] Missing accessible name. Provide a default slot, and set \`hideLabel\` to hide it visually.`,
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s doesn't warn when a label or aria-label names it",
    async (framework) => {
      await render[framework](components[framework], {
        label: "Named",
        value: "a",
      })
      await render[framework](components[framework], {
        "aria-label": "Named",
        value: "a",
      })
      expect(warnings()).toEqual([])
    },
  )
})

const TOGGLE_GROUP: Record<ComponentFramework, unknown> = {
  astro: ToggleGroupAstro,
  react: ToggleGroupReact,
  svelte: ToggleGroupSvelte,
  vue: ToggleGroupVue,
}

describe("ToggleGroup", () => {
  test.each(FRAMEWORKS)(
    "%s warns when it has no accessible name",
    async (framework) => {
      await render[framework](TOGGLE_GROUP[framework], {})
      expect(warnings()).toEqual([
        "[OPUI ToggleGroup] Missing accessible name. Name the group with `aria-label`, or with `aria-labelledby` pointing at a visible heading.",
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s doesn't warn when aria-label or aria-labelledby names it",
    async (framework) => {
      await render[framework](TOGGLE_GROUP[framework], {
        "aria-label": "Text alignment",
      })
      await render[framework](TOGGLE_GROUP[framework], {
        "aria-labelledby": "heading",
      })
      expect(warnings()).toEqual([])
    },
  )
})

const replacedIds: Record<
  ComponentFramework,
  (labelledby?: string) => Promise<string>
> = {
  astro: (labelledby) => render.astro(ReplacedIdsAstro, { labelledby }),
  react: (labelledby) =>
    render.react(() =>
      createElement(
        "div",
        null,
        createElement(
          DialogReact,
          { "aria-labelledby": labelledby },
          createElement(DialogTitleReact, { id: "own-dialog-title" }, "Title"),
        ),
        createElement(
          DrawerReact,
          { "aria-labelledby": labelledby, id: "drawer" },
          createElement(DrawerTitleReact, { id: "own-title" }, "Title"),
        ),
      ),
    ),
  svelte: (labelledby) => render.svelte(ReplacedIdsSvelte, { labelledby }),
  vue: (labelledby) =>
    render.vue({
      render: () => [
        h(DialogVue, { "aria-labelledby": labelledby }, () =>
          h(DialogTitleVue, { id: "own-dialog-title" }, () => "Title"),
        ),
        h(DrawerVue, { "aria-labelledby": labelledby, id: "drawer" }, () =>
          h(DrawerTitleVue, { id: "own-title" }, () => "Title"),
        ),
      ],
    }),
}

describe("DialogTitle and DrawerTitle ids", () => {
  test.each(FRAMEWORKS)(
    "%s replaces an own id with the generated one and warns",
    async (framework) => {
      const html = await replacedIds[framework]()
      expect(html).not.toContain('id="own-dialog-title"')
      expect(html).not.toContain('id="own-title"')
      expect(warnings()).toEqual([
        "[OPUI DialogTitle] `id` is replaced by the dialog's generated id; pass `aria-labelledby` on the Dialog to keep it.",
        "[OPUI DrawerTitle] `id` is replaced by the drawer's generated id; pass `aria-labelledby` on the Drawer to keep it.",
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s keeps the id without a warning when the root has aria-labelledby",
    async (framework) => {
      const html = await replacedIds[framework]("own-dialog-title")
      expect(html).toContain('id="own-dialog-title"')
      expect(html).toContain('id="own-title"')
      expect(warnings()).toEqual([])
    },
  )
})

const DIALOG_HEADER: Record<ComponentFramework, unknown> = {
  astro: DialogHeaderAstro,
  react: DialogHeaderReact,
  svelte: DialogHeaderSvelte,
  vue: DialogHeaderVue,
}

describe("DialogHeader", () => {
  test.each(FRAMEWORKS)(
    "%s warns when its close button has no dialog id to close",
    async (framework) => {
      await render[framework](DIALOG_HEADER[framework], {
        closeLabel: "Close",
      })
      expect(warnings()).toEqual([
        "[OPUI DialogHeader] `closeLabel` adds a close button that closes the Dialog through its `id`. Pass `id` on the Dialog.",
      ])
    },
  )

  test.each(FRAMEWORKS)(
    "%s doesn't warn without a close button",
    async (framework) => {
      await render[framework](DIALOG_HEADER[framework], {})
      expect(warnings()).toEqual([])
    },
  )
})
