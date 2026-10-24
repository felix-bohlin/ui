import type { ComponentApi } from "../types"

export default {
  component: "Radio",
  css: ["card", "choice", "radio"],
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
      "Attributes that aren't props go to the `<input>`, like `checked`, `disabled`, `name` and `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
    react:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `className` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange` on each radio, or `defaultChecked`.",
    svelte:
      "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or `children`.",
    vue: "Attributes that aren't props go to the `<input>`, like `disabled`, `name` or `value`, and `class` and `style` go to the root `<label>`. To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
  },
  options: [
    {
      class: ".ui-card",
      default: "false",
      description:
        "Renders the radio as a card: a padded, outlined surface that tints when hovered and when checked, with the label and `endText` inside. Add `spread` to put the input at the end, and `variant` to change the surface.",
      group: "Card",
      prop: "card",
    },
    {
      description:
        'Dims the radio and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the radio focusable and its value in the form, and doesn\'t stop the change, so block it with a script.',
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
      part: ".ui-radio > span",
      prop: "hideLabel",
    },
    {
      default: '"horizontal"',
      description:
        "The orientation of the element. `vertical` stacks the label under the input.",
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
      description: "Pushes the label and the input to opposite ends.",
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
      description: "The radio input.",
      model: true,
      selector: "input",
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
    selector: "label.ui-radio",
  },
  source: "Radio",
} satisfies ComponentApi
