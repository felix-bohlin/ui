import type { ComponentApi } from "../types"

export default {
  component: "Radio",
  css: ["choice", "radio"],
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
      "Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.",
    html: "To hide the label, use `.ui-sr-only` instead of `.ui-label`.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `children`. Use `checked` with `onChange` on each radio, or `defaultChecked`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.",
  },
  options: [
    {
      attribute: "[disabled]",
      description: "Dims the radio and shows a not-allowed cursor.",
      frameworks: ["html"],
      group: "Disabled",
      part: "input",
      prop: "disabled",
    },
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
      attribute: "[required]",
      description: "Adds a required mark after the label.",
      frameworks: ["html"],
      group: "Required",
      part: "input",
      prop: "required",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      class: ".ui-spread",
      default: "false",
      description: "Pushes the label and the input to opposite ends.",
      group: "Spread",
      prop: "spread",
    },
    {
      class: ".ui-stack",
      default: "false",
      description: "Stacks the label under the input.",
      group: "Stack",
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
      props: ["endText"],
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
