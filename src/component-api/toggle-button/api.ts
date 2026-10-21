import type { ComponentApi } from "../types"

export default {
  component: "ToggleButton",
  notes: {
    astro:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `id`, and `class` and `style` go to the root `<label>`.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `id`, and `className` and `style` go to the root `<label>`. `pressed` sets the starting state. To control it, pass `checked` and `onChange`. In a `ToggleGroup` with a `value` or `defaultValue`, the group's value sets the state instead.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `id`, and `class` and `style` go to the root `<label>`. In a `ToggleGroup` with `bind:value`, the group's value sets the state instead of `pressed`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `id`, and `class` and `style` go to the root `<label>`. In a `ToggleGroup` with `v-model`, the group's value sets the state instead of `pressed`.",
  },
  options: [
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the button.",
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
    },
    {
      description: "The id of the `<input>`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "The button text when there is no child content, and the input value when `value` is omitted.",
      prop: "label",
    },
    {
      description: "The name of the input. Set by the group.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      attribute: "[checked]",
      default: "false",
      description: "Selects the button.",
      group: "Checked",
      part: "input",
      prop: "pressed",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      default: '"checkbox"',
      description: 'The input type. `"radio"` allows one selection in a group.',
      group: "Type",
      part: "input",
      prop: "type",
      values: { checkbox: '[type="checkbox"]', radio: '[type="radio"]' },
    },
    {
      description: "The value of the input.",
      inherited: true,
      prop: "value",
      type: "string",
    },
  ],
  page: "toggle",
  parts: [
    {
      code: "<input>",
      description: "A visually hidden checkbox or radio input.",
      selector: ".ui-toggle-button > input",
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-toggle-button",
  },
  slots: [
    {
      description: "The label and an optional icon.",
      name: "default",
    },
  ],
  source: "ToggleButton",
} satisfies ComponentApi
