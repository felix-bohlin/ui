import { describe, expect, test } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import { render } from "./renderers"
import CalloutAstro from "../../packages/opui/components/Callout/Callout.astro"
import CalloutReact from "../../packages/opui/components/Callout/Callout.react"
import CalloutSolid from "../../packages/opui/components/Callout/Callout.solid"
import CalloutSvelte from "../../packages/opui/components/Callout/Callout.svelte"
import CalloutVue from "../../packages/opui/components/Callout/Callout.vue"
import DialogAstro from "../../packages/opui/components/Dialog/Dialog.astro"
import DialogReact from "../../packages/opui/components/Dialog/Dialog.react"
import DialogSolid from "../../packages/opui/components/Dialog/Dialog.solid"
import DialogSvelte from "../../packages/opui/components/Dialog/Dialog.svelte"
import DialogVue from "../../packages/opui/components/Dialog/Dialog.vue"
import FieldAstro from "../../packages/opui/components/Field/Field.astro"
import FieldReact from "../../packages/opui/components/Field/Field.react"
import FieldSolid from "../../packages/opui/components/Field/Field.solid"
import FieldSvelte from "../../packages/opui/components/Field/Field.svelte"
import FieldVue from "../../packages/opui/components/Field/Field.vue"
import NumberFieldAstro from "../../packages/opui/components/NumberField/NumberField.astro"
import NumberFieldReact from "../../packages/opui/components/NumberField/NumberField.react"
import NumberFieldSolid from "../../packages/opui/components/NumberField/NumberField.solid"
import NumberFieldSvelte from "../../packages/opui/components/NumberField/NumberField.svelte"
import NumberFieldVue from "../../packages/opui/components/NumberField/NumberField.vue"
import OneTimeCodeAstro from "../../packages/opui/components/OneTimeCode/OneTimeCode.astro"
import OneTimeCodeReact from "../../packages/opui/components/OneTimeCode/OneTimeCode.react"
import OneTimeCodeSolid from "../../packages/opui/components/OneTimeCode/OneTimeCode.solid"
import OneTimeCodeSvelte from "../../packages/opui/components/OneTimeCode/OneTimeCode.svelte"
import OneTimeCodeVue from "../../packages/opui/components/OneTimeCode/OneTimeCode.vue"
import RangeAstro from "../../packages/opui/components/Range/Range.astro"
import RangeReact from "../../packages/opui/components/Range/Range.react"
import RangeSolid from "../../packages/opui/components/Range/Range.solid"
import RangeSvelte from "../../packages/opui/components/Range/Range.svelte"
import RangeVue from "../../packages/opui/components/Range/Range.vue"

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
      solid: CalloutSolid,
      svelte: CalloutSvelte,
      vue: CalloutVue,
    },
    name: "Callout",
    prefix: "callout",
    props: { closeButton: true },
  },
  {
    base: (html) =>
      /aria-labelledby="([^"]+)-title"/.exec(html)?.[1] ?? undefined,
    components: {
      astro: DialogAstro,
      react: DialogReact,
      solid: DialogSolid,
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
      astro: RangeAstro,
      react: RangeReact,
      solid: RangeSolid,
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

const OWN_CONTROL: {
  components: Components
  name: string
  props: Record<string, unknown>
}[] = [
  {
    components: {
      astro: FieldAstro,
      react: FieldReact,
      solid: FieldSolid,
      svelte: FieldSvelte,
      vue: FieldVue,
    },
    name: "Field",
    props: { endText: "E", label: "L", startText: "S" },
  },
  {
    components: {
      astro: NumberFieldAstro,
      react: NumberFieldReact,
      solid: NumberFieldSolid,
      svelte: NumberFieldSvelte,
      vue: NumberFieldVue,
    },
    name: "NumberField",
    props: { endText: "E", label: "L", startText: "S" },
  },
  {
    components: {
      astro: OneTimeCodeAstro,
      react: OneTimeCodeReact,
      solid: OneTimeCodeSolid,
      svelte: OneTimeCodeSvelte,
      vue: OneTimeCodeVue,
    },
    name: "OneTimeCode",
    props: { endText: "E", label: "L" },
  },
]

describe.each(OWN_CONTROL)("$name", ({ components, props }) => {
  test.each(FRAMEWORKS)(
    "%s: every id is the control's, from for, or a part of it, and none is generated",
    async (framework) => {
      const calls: string[] = []
      const html = await renderWithIds(
        framework,
        components[framework],
        { ...props, [framework === "react" ? "htmlFor" : "for"]: "x" },
        (name: string) => {
          calls.push(name)
          return `${name}-1`
        },
      )
      expect(idsIn(html)).toEqual(expect.arrayContaining(["x", "x-end-text"]))
      expect(
        idsIn(html).filter((id) => id !== "x" && !id.startsWith("x-")),
      ).toEqual([])
      expect(calls).toEqual([])
    },
  )
})
