import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { describe, expect, test } from "vitest"
import RadioInputSvelte from "../../packages/opui/components/Radio/RadioInput.svelte"
import RadioInputVue from "../../packages/opui/components/Radio/RadioInput.vue"

const isChecked = (html: string) =>
  /<input[^>]*\schecked(=""|\s|>|\/)/.test(html)

const svelte = (props: Record<string, unknown>) =>
  isChecked(renderSvelte(RadioInputSvelte, { props }).body)

const vue = async (props: Record<string, unknown>) =>
  isChecked(
    await renderVue(createSSRApp({ render: () => h(RadioInputVue, props) })),
  )

describe("RadioInput checked", () => {
  test("the bound group wins over the radio's own checked", async () => {
    expect(svelte({ checked: true, group: "a", value: "b" })).toBe(false)
    expect(await vue({ checked: true, modelValue: "a", value: "b" })).toBe(
      false,
    )
  })

  test("the bound group checks the radio with its value", async () => {
    expect(svelte({ group: "b", value: "b" })).toBe(true)
    expect(await vue({ modelValue: "b", value: "b" })).toBe(true)
  })

  test("checked applies when no group is bound", async () => {
    expect(svelte({ checked: true, value: "b" })).toBe(true)
    expect(await vue({ checked: true, value: "b" })).toBe(true)
  })
})
