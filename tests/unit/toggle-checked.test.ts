import { createElement } from "react"
import { h } from "vue"
import { describe, expect, test, vi } from "vitest"
import ToggleButtonReact from "../../packages/opui/components/ToggleButton/ToggleButton.react"
import ToggleButtonSvelte from "../../packages/opui/components/ToggleButton/ToggleButton.svelte"
import ToggleButtonVue from "../../packages/opui/components/ToggleButton/ToggleButton.vue"
import ToggleGroupReact from "../../packages/opui/components/ToggleGroup/ToggleGroup.react"
import ToggleGroupVue from "../../packages/opui/components/ToggleGroup/ToggleGroup.vue"
import GroupedToggleSvelte from "./fixtures/GroupedToggle.svelte"
import { render } from "./renderers"

const checkedInputs = (html: string) =>
  [...html.matchAll(/<input[^>]*>/g)]
    .filter(([input]) => /\schecked(=""|\s|>|\/)/.test(input))
    .map(([input]) => input.match(/value="([^"]*)"/)?.[1])

describe("ToggleButton checked", () => {
  test.each([
    ["react", ToggleButtonReact, { defaultChecked: true }],
    ["svelte", ToggleButtonSvelte, { checked: true }],
    ["vue", ToggleButtonVue, { checked: true }],
  ] as const)(
    "a standalone button renders checked in %s",
    async (framework, component, props) => {
      expect(
        checkedInputs(
          await render[framework](component, {
            ...props,
            label: "Bold",
            value: "Bold",
          }),
        ),
      ).toEqual(["Bold"])
    },
  )

  test("the group's value wins over a button's own checked", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(
      checkedInputs(
        await render.react(ToggleGroupReact, {
          children: [
            createElement(ToggleButtonReact, {
              key: "left",
              label: "left",
              value: "left",
            }),
            createElement(ToggleButtonReact, {
              checked: true,
              key: "right",
              label: "right",
              onChange: () => {},
              value: "right",
            }),
          ],
          value: "left",
        }),
      ),
    ).toEqual(["left"])
    expect(checkedInputs(await render.svelte(GroupedToggleSvelte))).toEqual([
      "left",
    ])
    expect(
      checkedInputs(
        await render.vue({
          render: () =>
            h(ToggleGroupVue, { modelValue: "left" }, () => [
              h(ToggleButtonVue, { label: "left", value: "left" }),
              h(ToggleButtonVue, {
                checked: true,
                label: "right",
                value: "right",
              }),
            ]),
        }),
      ),
    ).toEqual(["left"])
    expect(
      warn.mock.calls.filter(([message]) =>
        String(message).includes("`checked` is ignored inside a ToggleGroup"),
      ),
      "one warning per framework",
    ).toHaveLength(3)
    warn.mockRestore()
  })
})
