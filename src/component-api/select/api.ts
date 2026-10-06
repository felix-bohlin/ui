import type { ComponentApi } from "../types"

export default {
  component: "Select",
  css: ["select", "text-field"],
  model: {
    description: "The selected value, or values with `multiple`.",
    prop: "value",
    type: "string | number | (string | number)[]",
  },
  notes: {
    astro:
      "Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.",
    html: "The `<select>` holds a `<button>` with `<selectedcontent>`, and a `.ui-list` with the options. Browsers without customizable selects show a native select.",
    solid:
      "Props that aren't listed here, such as `disabled`, `multiple` or `name`, go to the `<select>`. `value` selects the matching `items`.",
    vue: "Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.",
  },
  options: [
    {
      class: ".ui-dense",
      default: "false",
      description: "Packs the options tighter.",
      group: "Dense",
      part: ".ui-list",
      prop: "dense",
    },
    {
      attribute: "[data-invalid]",
      default: "false",
      description: "Shows error styles.",
      group: "Validation",
      prop: "error",
    },
    {
      description: "The id of the `<select>`.",
      frameworks: ["astro", "solid", "vue"],
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
        "Pushes the label and description to one side and the select to the other.",
      group: "Layout",
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
      description: "Description text displayed above the field.",
      props: ["description"],
      selector: ".ui-start-text",
      slots: ["description"],
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
