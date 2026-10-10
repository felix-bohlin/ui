import type { ComponentApi } from "../types"

export default {
  component: "Radio",
  model: {
    description: "The selected value of the group.",
    frameworks: {
      svelte: [
        {
          description: "The selected value of the group.",
          prop: "group",
          type: "string | number | boolean",
        },
      ],
    },
    prop: "value",
    type: "string | number | boolean",
  },
  notes: {
    astro:
      "Other attributes go to the `<input>`, like `checked`, `disabled`, `name` and `value`. To hide the label, set `hideLabel` and keep the text in the slot.",
    html: "To hide the label, use `.ui-sr-only` instead of `.ui-label`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`. To hide the label, set `hideLabel` and keep the text in `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`. To hide the label, set `hideLabel` and keep the text in the slot.",
  },
  options: [
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "input",
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
      values: {
        large: ".ui-large",
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      class: ".ui-spread",
      default: "false",
      description: "Pushes the label and the input to opposite ends.",
      group: "Layout",
      prop: "spread",
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
