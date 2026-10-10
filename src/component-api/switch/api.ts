import type { ComponentApi } from "../types"

export default {
  component: "Switch",
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
      "Other attributes go to the `<input>`, like `checked`, `disabled`, `name` and `required`. To hide the label, set `hideLabel` and keep the text in the slot.",
    html: 'The input needs `type="checkbox"` and `role="switch"`. To hide the label, use `.ui-sr-only` instead of `.ui-label`.',
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`. To hide the label, set `hideLabel` and keep the text in `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `name`. To hide the label, set `hideLabel` and keep the text in the slot.",
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
      description: "Pushes the label and the switch to opposite ends.",
      group: "Layout",
      prop: "spread",
    },
    {
      class: ".ui-stack",
      default: "false",
      description: "Stacks the label under the switch.",
      group: "Layout",
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
