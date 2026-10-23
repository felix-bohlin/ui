import { createElement } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { describe, expect, test, vi } from "vitest"
import ToggleButtonReact from "../../packages/opui/components/ToggleButton/ToggleButton.react"
import ToggleButtonSvelte from "../../packages/opui/components/ToggleButton/ToggleButton.svelte"
import ToggleButtonVue from "../../packages/opui/components/ToggleButton/ToggleButton.vue"
import ToggleGroupReact from "../../packages/opui/components/ToggleGroup/ToggleGroup.react"
import ToggleGroupVue from "../../packages/opui/components/ToggleGroup/ToggleGroup.vue"

const checkedInputs = (html: string) =>
  [...html.matchAll(/<input[^>]*>/g)]
    .filter(([input]) => /\schecked(=""|\s|>|\/)/.test(input))
    .map(([input]) => input.match(/value="([^"]*)"/)?.[1])

describe("ToggleButton checked", () => {
  test("a standalone button renders checked in every framework", async () => {
    expect(
      checkedInputs(
        renderReact(
          createElement(ToggleButtonReact, {
            defaultChecked: true,
            label: "Bold",
          }),
        ),
      ),
    ).toEqual(["Bold"])
    expect(
      checkedInputs(
        renderSvelte(ToggleButtonSvelte, {
          props: { checked: true, label: "Bold" },
        }).body,
      ),
    ).toEqual(["Bold"])
    expect(
      checkedInputs(
        await renderVue(
          createSSRApp({
            render: () => h(ToggleButtonVue, { checked: true, label: "Bold" }),
          }),
        ),
      ),
    ).toEqual(["Bold"])
  })

  test("the group's value wins over a button's own checked", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(
      checkedInputs(
        renderReact(
          createElement(
            ToggleGroupReact,
            { selection: "single", value: "left" },
            createElement(ToggleButtonReact, { label: "left" }),
            createElement(ToggleButtonReact, {
              checked: true,
              label: "right",
              onChange: () => {},
            }),
          ),
        ),
      ),
    ).toEqual(["left"])
    expect(
      checkedInputs(
        await renderVue(
          createSSRApp({
            render: () =>
              h(
                ToggleGroupVue,
                { modelValue: "left", selection: "single" },
                () => [
                  h(ToggleButtonVue, { label: "left" }),
                  h(ToggleButtonVue, { checked: true, label: "right" }),
                ],
              ),
          }),
        ),
      ),
    ).toEqual(["left"])
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("`checked` is ignored inside a ToggleGroup"),
    )
    warn.mockRestore()
  })
})
