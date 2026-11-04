import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import type { Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { describe, expect, test } from "vitest"
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

const container = await AstroContainer.create()

type Components = {
  astro: Parameters<typeof container.renderToString>[0]
  react: unknown
  svelte: unknown
  vue: unknown
}

const render = {
  astro: (
    component: Components["astro"],
    props: Record<string, unknown>,
    $id: (prefix: string) => string,
  ) =>
    container.renderToString(component, {
      locals: { $id, framework: "astro", link: (path: string) => path },
      props,
    }),
  react: async (component: unknown, props: Record<string, unknown>) =>
    renderReact(
      createElement(component as ComponentType<Record<string, unknown>>, props),
    ),
  svelte: async (component: unknown, props: Record<string, unknown>) =>
    renderSvelte(component as SvelteComponent<Record<string, unknown>>, {
      props,
    }).body,
  vue: (component: unknown, props: Record<string, unknown>) =>
    renderVue(
      createSSRApp({ render: () => h(component as VueComponent, props) }),
    ),
}

const ID_ATTRIBUTES =
  /\s(?:id|for|list|aria-labelledby|aria-describedby|aria-controls)="([^"]*)"/g

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
    base: (html) => /\sid="([^"]+)-label"/.exec(html)?.[1],
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

const FRAMEWORKS = ["astro", "react", "svelte", "vue"] as const

describe.each(CASES)("$name", ({ base, components, prefix, props }) => {
  test.each(FRAMEWORKS)(
    "%s: every id is the passed id or a part of it",
    async (framework) => {
      const calls: string[] = []
      const html = await render[framework](
        components[framework] as never,
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
      const html = await render[framework](
        components[framework] as never,
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
