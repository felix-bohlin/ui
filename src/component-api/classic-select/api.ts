import type { ComponentApi } from "../types"

export default {
  component: "ClassicSelect",
  css: ["select", "text-field"],
  model: {
    description: "The selected value, or values with `multiple`.",
    prop: "value",
    type: "string | number | (string | number)[]",
  },
  notes: {
    astro:
      "Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.",
    svelte:
      "Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.",
    vue: "Attributes that aren't props, such as `disabled` or `name`, go to the `<select>`.",
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
      description: "The id of the `<select>`. Generated when omitted.",
      prop: "id",
    },
    {
      default: "[]",
      description: "The options, as `{ text, value }` objects.",
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
      default: '"outlined"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { filled: ".ui-filled", outlined: null },
    },
  ],
  page: "select",
  parts: [
    {
      description: "The label for the field.",
      props: ["label"],
      selector: ".ui-label",
    },
    {
      description: "The boxed select area.",
      selector: ".ui-field",
    },
    {
      code: "<select>",
      description: "A native select.",
      model: true,
      selector: "select",
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
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
  source: "ClassicSelect",
} satisfies ComponentApi
