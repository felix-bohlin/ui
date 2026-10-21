import type { ComponentApi } from "../types"

export default {
  component: "Switch",
  css: ["choice", "switch"],
  model: {
    description: "The checked state, or the checked values of a group.",
    frameworks: {
      svelte: [
        {
          description: "The checked state.",
          prop: "checked",
          type: "boolean",
        },
        {
          description: "The checked values of a group.",
          prop: "group",
          type: "(string | number)[]",
        },
      ],
    },
    prop: "checked",
    type: "boolean | (string | number)[]",
  },
  notes: {
    astro:
      "Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `required`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.",
    html: 'The input needs `type="checkbox"` and `role="switch"`. To hide the label, use `.ui-sr-only` instead of `.ui-label`.',
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `children`. Use `checked` with `onChange`, or `defaultChecked`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in the slot.",
  },
  options: [
    {
      attribute: "[disabled]",
      description: "Dims the switch and shows a not-allowed cursor.",
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
      description: "Pushes the label and the switch to opposite ends.",
      group: "Spread",
      prop: "spread",
    },
    {
      class: ".ui-stack",
      default: "false",
      description: "Stacks the label under the switch.",
      group: "Stack",
      prop: "stack",
    },
  ],
  parts: [
    {
      code: "<input>",
      description: "The switch input.",
      model: true,
      selector: "input",
    },
    {
      description: "An optional icon in the thumb when unchecked.",
      selector: ".ui-icon-unchecked",
      slots: ["icon-unchecked"],
    },
    {
      description: "An optional icon in the thumb when checked.",
      selector: ".ui-icon-checked",
      slots: ["icon-checked"],
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
    selector: "label.ui-switch",
  },
  source: "Switch",
} satisfies ComponentApi
