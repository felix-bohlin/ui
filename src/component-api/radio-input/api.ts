import type { ComponentApi } from "../types"

export default {
  component: "RadioInput",
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
      "The radio `<input>` without the label, for a custom layout such as the end of a list item. Other attributes go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    react:
      "The radio `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    svelte:
      "The radio `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    vue: "The radio `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
  },
  options: [],
  page: "radio",
  parts: [],
  root: {
    code: '<input type="radio">',
    component: {
      astro: "RadioInput",
      react: "RadioInput",
      svelte: "RadioInput",
      vue: "RadioInput",
    },
    description: "The radio input, without a label.",
    selector: 'input[type="radio"]',
  },
  source: "Radio",
} satisfies ComponentApi
