import { describe, expect, test } from "vitest"
import CheckboxSvelte from "../../packages/opui/components/Checkbox/Checkbox.svelte"
import RadioSvelte from "../../packages/opui/components/Radio/Radio.svelte"
import RangeSvelte from "../../packages/opui/components/Range/Range.svelte"
import SwitchSvelte from "../../packages/opui/components/Switch/Switch.svelte"
import TabsItemSvelte from "../../packages/opui/components/Tabs/TabsItem.svelte"
import TextareaSvelte from "../../packages/opui/components/Textarea/Textarea.svelte"
import TextFieldSvelte from "../../packages/opui/components/TextField/TextField.svelte"
import ToggleButtonSvelte from "../../packages/opui/components/ToggleButton/ToggleButton.svelte"
import { render } from "./renderers"

describe("a default the caller passes to a Svelte form control", () => {
  test.each([
    [
      "Checkbox",
      CheckboxSvelte,
      { defaultChecked: true },
      /<input[^>]*\schecked/,
    ],
    ["Radio", RadioSvelte, { defaultChecked: true }, /<input[^>]*\schecked/],
    ["Range", RangeSvelte, { defaultValue: 20 }, /<input[^>]*\svalue="20"/],
    ["Switch", SwitchSvelte, { defaultChecked: true }, /<input[^>]*\schecked/],
    [
      "TabsItem",
      TabsItemSvelte,
      { defaultChecked: true },
      /<input[^>]*\schecked/,
    ],
    [
      "Textarea",
      TextareaSvelte,
      { defaultValue: "kept" },
      /<textarea[^>]*>kept</,
    ],
    [
      "TextField",
      TextFieldSvelte,
      { defaultValue: "kept" },
      /<input[^>]*\svalue="kept"/,
    ],
    [
      "ToggleButton",
      ToggleButtonSvelte,
      { defaultChecked: true },
      /<input[^>]*\schecked/,
    ],
  ] as const)(
    "%s renders it as the control's state, not as an attribute",
    async (_, component, props, rendered) => {
      const html = await render.svelte(component, { ...props, label: "Note" })
      expect(html).not.toMatch(/\sdefault(value|checked)=/i)
      expect(html).toMatch(rendered)
    },
  )

  test("Range reads it in its value text", async () => {
    const html = await render.svelte(RangeSvelte, {
      defaultValue: 20,
      label: "Volume",
      valueSuffix: "%",
    })
    expect(html).toContain("20%")
    expect(html).not.toContain("50%")
  })
})
