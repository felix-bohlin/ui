import type { ComponentApi } from "../types"

export default {
  component: "Switch",
  css: ["card", "choice", "switch"],
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
      "Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `required`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
    html: 'The input needs `type="checkbox"` and `role="switch"`.',
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange`, or `defaultChecked`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
  },
  options: [
    {
      class: ".ui-card",
      default: "false",
      description:
        "Renders the switch as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface.",
      group: "Card",
      prop: "card",
    },
    {
      description:
        'Dims the switch and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the switch focusable and its value in the form, and doesn\'t stop the change, so block it with a script.',
      frameworks: ["html"],
      group: "Disabled",
      part: "input",
      prop: "disabled",
      values: {
        "aria-disabled": '[aria-disabled="true"]',
        disabled: "[disabled]",
      },
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
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`.",
      group: "Label",
      part: ".ui-switch > span",
      prop: "hideLabel",
    },
    {
      default: '"horizontal"',
      description:
        "The orientation of the element. `vertical` stacks the label under the switch.",
      group: "Orientation",
      prop: "orientation",
      values: { horizontal: null, vertical: ".ui-vertical" },
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
      description: "Pushes the label and the switch to opposite ends.",
      group: "Spread",
      prop: "spread",
    },
    {
      default: '"outlined"',
      description:
        "The surface of the card, with `card`. `outlined` has a border, `tonal` a tinted surface and `elevated` a shadow, like Card.",
      group: "Variants",
      prop: "variant",
      values: { elevated: ".ui-elevated", outlined: null, tonal: ".ui-tonal" },
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
      props: ["label"],
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
