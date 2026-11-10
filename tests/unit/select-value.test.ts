import { describe, expect, test } from "vitest"
import SelectAstro from "../../packages/opui/components/Select/Select.astro"
import SelectReact from "../../packages/opui/components/Select/Select.react"
import SelectSvelte from "../../packages/opui/components/Select/Select.svelte"
import SelectVue from "../../packages/opui/components/Select/Select.vue"
import { render } from "./renderers"

const COMPONENTS = {
  astro: SelectAstro,
  react: SelectReact,
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
