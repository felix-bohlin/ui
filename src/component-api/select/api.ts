import type { ComponentApi } from "../types"

export default {
  component: "Select",
  css: ["list", "select", "text-field"],
  model: {
    description: "The selected value, or values with `multiple`.",
    prop: "value",
    type: "string | number | (string | number)[]",
  },
  notes: {
    astro:
      "Other attributes go to the `<select>`, like `disabled`, `multiple`, `name` and `required`, and `class` and `style` go to the root `<label>`.",
    html: "The `<select>` holds a `<button>` and a `.ui-list`. The button holds `<selectedcontent>`. The list holds the options. Browsers without customizable selects show a native select.",
    react:
      "Attributes that aren't props go to the `<select>`, like `disabled` or `name`, and `className` and `style` go to the root `<label>`.",
    svelte:
      "Attributes that aren't props go to the `<select>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`.",
    vue: "Attributes that aren't props go to the `<select>`, like `disabled` or `name`, and `class` and `style` go to the root `<label>`.",
  },
  options: [
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the items tighter.",
      group: "Dense",
      part: ".ui-list",
      prop: "dense",
    },
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "select",
      prop: "error",
    },
    {
      description: "The id of the `<select>`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      default: "[]",
      description: "The options, as `{ selected, text, value }` objects.",
      prop: "items",
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
      description:
        "Pushes the label and start text to one side and the select to the other.",
      group: "Spread",
      prop: "spread",
    },
    {
      default: '"outlined"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { filled: ".ui-filled", outlined: null },
    },
  ],
  parts: [
    {
      description: "The label for the field.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["label"],
    },
    {
      description: "Start text displayed above the field.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      description: "The boxed select area.",
      selector: ".ui-field",
    },
    {
      description:
        "Content above the select, inside the border, with a divider.",
      selector: ".ui-header",
      slots: ["header"],
    },
    {
      description:
        "Content at the inline-start of the field, inside the border.",
      selector: ".ui-prefix",
      slots: ["prefix"],
    },
    {
      code: "<select>",
      description: "The select. Its options are in a popover list.",
      model: true,
      selector: "select",
    },
    {
      description: "Content at the inline-end of the field, inside the border.",
      selector: ".ui-suffix",
      slots: ["suffix"],
    },
    {
      description:
        "Content below the select, inside the border, with a divider.",
      selector: ".ui-footer",
      slots: ["footer"],
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
  ],
  root: {
    description: "Container element.",
    selector: "label.ui-select",
  },
  slots: [
    {
      description: "Extra `<option>` and `<optgroup>` elements.",
      name: "default",
    },
  ],
  source: "Select",
} satisfies ComponentApi
