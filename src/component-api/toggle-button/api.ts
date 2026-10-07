import type { ComponentApi } from "../types"

export default {
  component: "ToggleButton",
  options: [
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the button.",
      frameworks: ["astro", "html", "svelte", "vue"],
      group: "State",
      part: "input",
      prop: "disabled",
      type: "boolean",
    },
    {
      description: "The id of the `<input>`. Generated when omitted.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "id",
      type: "string",
    },
    {
      description:
        "The button text when the slot is empty, and the input value when `value` is omitted.",
      prop: "label",
    },
    {
      description: "The name of the input. Set by the group.",
      frameworks: ["astro", "svelte", "vue"],
      prop: "name",
      type: "string",
    },
    {
      attribute: "[checked]",
      default: "false",
      description: "Selects the button.",
      group: "State",
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
      frameworks: ["astro", "svelte", "vue"],
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
