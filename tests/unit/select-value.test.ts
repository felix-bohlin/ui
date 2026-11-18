import { ssrElement } from "@solidjs/web"
import { describe, expect, test } from "vitest"
import SelectAstro from "../../packages/opui/components/Select/Select.astro"
import SelectReact from "../../packages/opui/components/Select/Select.react"
import SelectSolid from "../../packages/opui/components/Select/Select.solid"
import SelectSvelte from "../../packages/opui/components/Select/Select.svelte"
import SelectVue from "../../packages/opui/components/Select/Select.vue"
import { render, renderSolid } from "./renderers"

const COMPONENTS = {
  astro: SelectAstro,
  react: SelectReact,
  solid: SelectSolid,
  svelte: SelectSvelte,
  vue: SelectVue,
}

const items = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
]

const selected = (html: string) =>
  [...html.matchAll(/<option\b[^>]*>/g)]
    .filter(([tag]) => /\sselected(?:=""|(?=[\s>]))/.test(tag))
    .map(([tag]) => /\svalue="([^"]*)"/.exec(tag)?.[1])

describe("Select value picks items as text, like the native select", () => {
  test.each(Object.entries(COMPONENTS))("%s", async (framework, component) => {
    const renderer = render[framework as keyof typeof render]
    expect(selected(await renderer(component, { items, value: "2" }))).toEqual([
      "2",
    ])
    expect(
      selected(
        await renderer(component, { items, multiple: true, value: ["1", 2] }),
      ),
    ).toEqual(["1", "2"])
    expect(selected(await renderer(component, { items, value: "3" }))).toEqual(
      [],
    )
  })
})

describe("Select defaultValue picks the options the caller writes, like React's select", () => {
  const values = ["a", "b", "c"]
  const withOptions = {
    react: (props: Record<string, unknown>) =>
      render.react(SelectReact, props, {
        default: values
          .map((value) => `<option value="${value}">${value}</option>`)
          .join(""),
      }),
    solid: async (props: Record<string, unknown>) =>
      renderSolid(SelectSolid as never, {
        ...props,
        get children() {
          return values.map((value) =>
            ssrElement("option", { value }, value, false),
          )
        },
      }),
  }

  test.each(Object.entries(withOptions))("%s", async (_, rendered) => {
    expect(selected(await rendered({ defaultValue: "b" }))).toEqual(["b"])
    expect(
      selected(await rendered({ defaultValue: ["a", "c"], multiple: true })),
    ).toEqual(["a", "c"])
    expect(selected(await rendered({ defaultValue: "b", value: "c" }))).toEqual(
      ["c"],
    )
    expect(selected(await rendered({}))).toEqual([])
  })
})
