import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Radio",
  css: ["card", "choice", "radio"],
  keyboard: [
    {
      description:
        "Moves focus into the group, to the checked radio. When none is checked, focus goes to the first radio. The next Tab leaves the group.",
      keys: ["Tab"],
    },
    {
      description: "Checks the focused radio.",
      keys: ["Space"],
    },
    {
      description:
        "Moves focus to the previous or next radio and checks it, wrapping around at the ends (Safari stops at the first and the last). Left and Right follow the reading direction.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
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
  notes: passThrough("input", "label", ["autofocus", "form"], {
    default:
      "To hide the label, set `hideLabel` and keep the text in `label` or the slot.",
    react:
      "To hide the label, set `hideLabel` and keep the text in `label` or `children`. Use `checked` with `onChange` on each radio, or `defaultChecked`.",
    svelte:
      "To hide the label, set `hideLabel` and keep the text in `label` or `children`.",
  }),
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
      default: "false",
      description:
        'Dims the radio and shows a not-allowed cursor. `aria-disabled="true"` looks the same, but keeps the radio focusable and its value in the form, and doesn\'t stop the change, so block it with a script.',
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
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
      description: "The id of the `<input>`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description:
        "The name of the `<input>`. Inside a `FieldGroup`, the group's `name` applies.",
      inherited: true,
      prop: "name",
      type: "string",
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
      description:
        "Adds a required mark after the label. The form won't submit until one radio in the group is checked.",
      group: "Required",
      inherited: true,
      part: "input",
      prop: "required",
      type: "boolean",
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
      description:
        "The value of the `<input>`, submitted with the form when it's checked.",
      inherited: true,
      prop: "value",
      type: "string",
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
