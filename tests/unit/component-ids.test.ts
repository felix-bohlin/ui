import { describe, expect, test } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import { render } from "./renderers"
import CalloutAstro from "../../packages/opui/components/Callout/Callout.astro"
import CalloutReact from "../../packages/opui/components/Callout/Callout.react"
import CalloutSvelte from "../../packages/opui/components/Callout/Callout.svelte"
import CalloutVue from "../../packages/opui/components/Callout/Callout.vue"
import DialogAstro from "../../packages/opui/components/Dialog/Dialog.astro"
import DialogReact from "../../packages/opui/components/Dialog/Dialog.react"
import DialogSvelte from "../../packages/opui/components/Dialog/Dialog.svelte"
import DialogVue from "../../packages/opui/components/Dialog/Dialog.vue"
import NumberFieldAstro from "../../packages/opui/components/NumberField/NumberField.astro"
import NumberFieldReact from "../../packages/opui/components/NumberField/NumberField.react"
import NumberFieldSvelte from "../../packages/opui/components/NumberField/NumberField.svelte"
import NumberFieldVue from "../../packages/opui/components/NumberField/NumberField.vue"
import RangeAstro from "../../packages/opui/components/Range/Range.astro"
import RangeReact from "../../packages/opui/components/Range/Range.react"
import RangeSvelte from "../../packages/opui/components/Range/Range.svelte"
import RangeVue from "../../packages/opui/components/Range/Range.vue"
import SelectAstro from "../../packages/opui/components/Select/Select.astro"
import SelectReact from "../../packages/opui/components/Select/Select.react"
import SelectSvelte from "../../packages/opui/components/Select/Select.svelte"
import SelectVue from "../../packages/opui/components/Select/Select.vue"
import TextFieldAstro from "../../packages/opui/components/TextField/TextField.astro"
import TextFieldReact from "../../packages/opui/components/TextField/TextField.react"
import TextFieldSvelte from "../../packages/opui/components/TextField/TextField.svelte"
import TextFieldVue from "../../packages/opui/components/TextField/TextField.vue"

type Components = Record<ComponentFramework, unknown>

const renderWithIds = (
  framework: ComponentFramework,
  component: unknown,
  props: Record<string, unknown>,
  $id: (prefix: string) => string,
) =>
  framework === "astro"
    ? render.astro(
        component,
        props,
        {},
        { $id, framework: "astro", link: (path: string) => path },
      )
    : render[framework](component, props)

const ID_ATTRIBUTES =
  /\s(?:id|for|list|aria-labelledby|aria-describedby|aria-controls|commandfor)="([^"]*)"/g

const idsIn = (html: string) =>
  [...html.matchAll(ID_ATTRIBUTES)].flatMap((match) =>
    match[1].split(/\s+/).filter(Boolean),
  )

const inputId = (html: string) => /<input[^>]*\sid="([^"]+)"/.exec(html)?.[1]

const CASES: {
  base: (html: string) => string | undefined
  components: Components
  name: string
  prefix: string
  props: Record<string, unknown>
}[] = [
  {
    base: (html) => /<opui-callout[^>]*\sid="([^"]+)"/.exec(html)?.[1],
    components: {
      astro: CalloutAstro,
      react: CalloutReact,
      svelte: CalloutSvelte,
      vue: CalloutVue,
    },
    name: "Callout",
    prefix: "callout",
    props: { dismissible: true },
  },
  {
    base: (html) =>
      /aria-labelledby="([^"]+)-title"/.exec(html)?.[1] ?? undefined,
    components: {
      astro: DialogAstro,
      react: DialogReact,
      svelte: DialogSvelte,
      vue: DialogVue,
    },
    name: "Dialog",
    prefix: "dialog",
    props: {},
  },
  {
    base: inputId,
    components: {
      astro: NumberFieldAstro,
      react: NumberFieldReact,
      svelte: NumberFieldSvelte,
      vue: NumberFieldVue,
    },
    name: "NumberField",
    prefix: "number-field",
    props: { endText: "E", label: "L", startText: "S" },
  },
  {
    base: inputId,
    components: {
      astro: RangeAstro,
      react: RangeReact,
      svelte: RangeSvelte,
      vue: RangeVue,
    },
    name: "Range",
    prefix: "range",
    props: {
      endText: "E",
      items: [{ label: "A", value: 1 }],
      label: "L",
      startText: "S",
      valueSuffix: "%",
    },
  },
  {
    base: (html) => /<select[^>]*\sid="([^"]+)"/.exec(html)?.[1],
    components: {
      astro: SelectAstro,
      react: SelectReact,
      svelte: SelectSvelte,
      vue: SelectVue,
    },
    name: "Select",
    prefix: "select",
    props: {
      endText: "E",
      items: [{ label: "A", value: "a" }],
      label: "L",
      startText: "S",
    },
  },
  {
    base: inputId,
    components: {
      astro: TextFieldAstro,
      react: TextFieldReact,
      svelte: TextFieldSvelte,
      vue: TextFieldVue,
    },
    name: "TextField",
    prefix: "text-field",
    props: { endText: "E", label: "L", passwordToggle: true, startText: "S" },
  },
]

const FRAMEWORKS = Object.keys(render) as ComponentFramework[]

describe.each(CASES)("$name", ({ base, components, prefix, props }) => {
  test.each(FRAMEWORKS)(
    "%s: every id is the passed id or a part of it",
    async (framework) => {
      const calls: string[] = []
      const html = await renderWithIds(
        framework,
        components[framework],
        { ...props, id: "x" },
        (name: string) => {
          calls.push(name)
          return `${name}-1`
        },
      )
      expect(idsIn(html).length).toBeGreaterThan(0)
      expect(
        idsIn(html).filter((id) => id !== "x" && !id.startsWith("x-")),
      ).toEqual([])
      expect(calls).toEqual([])
    },
  )

  test.each(FRAMEWORKS)(
    "%s: without an id, every id is a part of one generated base",
    async (framework) => {
      const calls: string[] = []
      const html = await renderWithIds(
        framework,
        components[framework],
        props,
        (name: string) => {
          calls.push(name)
          return `${name}-${calls.length}`
        },
      )
      const generated = base(html)!
      expect(generated.startsWith(`${prefix}-`)).toBe(true)
      expect(
        idsIn(html).filter(
          (id) => id !== generated && !id.startsWith(`${generated}-`),
        ),
      ).toEqual([])
      if (framework === "astro") expect(calls).toEqual([prefix])
    },
  )
})
