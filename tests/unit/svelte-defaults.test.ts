import { describe, expect, test } from "vitest"
import CheckboxSvelte from "../../packages/opui/components/Checkbox/Checkbox.svelte"
import TextareaSvelte from "../../packages/opui/components/Textarea/Textarea.svelte"
import TextFieldSvelte from "../../packages/opui/components/TextField/TextField.svelte"
import { render } from "./renderers"

describe("a default the caller passes to a Svelte form control", () => {
  test.each([
    ["Checkbox", CheckboxSvelte, { defaultChecked: true }],
    ["Textarea", TextareaSvelte, { defaultValue: "kept" }],
    ["TextField", TextFieldSvelte, { defaultValue: "kept" }],
  ] as const)(
    "%s takes it as the control's default, not as an attribute",
    async (_, component, props) => {
      const html = await render.svelte(component, { ...props, label: "Note" })
      expect(html).not.toMatch(/\sdefault(value|checked)=/i)
    },
  )
})
