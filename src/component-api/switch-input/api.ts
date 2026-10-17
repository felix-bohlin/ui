import type { ComponentApi } from "../types"

export default {
  component: "SwitchInput",
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
      "The switch `<input>` without the label, for a custom layout such as the end of a list item. Other attributes go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    react:
      "The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    svelte:
      "The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
    vue: "The switch `<input>` without the label, for a custom layout such as the end of a list item. Attributes that aren't props go to the `<input>`. Inside a `FieldGroup`, it takes the group's `name`.",
  },
  options: [],
  page: "switch",
  parts: [],
  root: {
    code: '<input type="checkbox" role="switch">',
    component: {
      astro: "SwitchInput",
      react: "SwitchInput",
      svelte: "SwitchInput",
      vue: "SwitchInput",
    },
    description: "The switch input, without a label.",
    selector: 'input[role="switch"]',
  },
  source: "Switch",
} satisfies ComponentApi
