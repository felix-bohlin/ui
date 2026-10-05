import type { ComponentApi } from "../types"

export default {
  component: "Radio",
  model: {
    description: "The selected value of the group.",
    prop: "value",
    type: "string | number | boolean",
  },
  notes: {
    astro:
      "Other attributes, such as `checked`, `disabled`, `name` and `value`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.",
    html: "Use `.ui-sr-only` instead of `.ui-label` to hide the label visually.",
    vue: "Attributes that aren't props, such as `disabled`, `name` or `value`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.",
  },
  options: [
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      default: "false",
      description: "Visually hides the label.",
      prop: "hideLabel",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { large: ".ui-large", small: ".ui-small" },
    },
    {
      class: ".ui-stack",
      default: "false",
      description: "Stacks the label under the input.",
      group: "Layout",
      prop: "stack",
    },
  ],
  parts: [
    {
      code: "<input>",
      description: "The radio input.",
      model: true,
      selector: "input",
    },
    {
      description: "The label.",
      selector: ".ui-label",
      slots: ["default"],
    },
    {
      description: "Supporting text displayed below the label.",
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-radio",
  },
  source: "Radio",
} satisfies ComponentApi
