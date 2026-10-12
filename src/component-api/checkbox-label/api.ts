import type { ComponentApi } from "../types"

export default {
  component: "CheckboxLabel",
  css: ["checkbox"],
  file: "FieldLabel",
  options: [
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        "Hides the label visually. Screen readers still announce it.",
      htmlDescription:
        "Use `.ui-sr-only` instead of `.ui-label` to hide the label visually.",
      prop: "visuallyHidden",
    },
  ],
  page: "checkbox",
  parts: [],
  root: {
    component: {
      astro: "CheckboxLabel",
      react: "CheckboxLabel",
      svelte: "CheckboxLabel",
      vue: "CheckboxLabel",
    },
    description: "The label.",
    selector: ".ui-checkbox .ui-label",
  },
  slots: [
    {
      description: "The label text.",
      name: "default",
    },
  ],
  source: "Field",
} satisfies ComponentApi
