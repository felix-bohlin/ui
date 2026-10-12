import type { ComponentApi } from "../types"

export default {
  component: "TextFieldLabel",
  css: ["text-field"],
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
  page: "text-field",
  parts: [],
  root: {
    component: {
      astro: "TextFieldLabel",
      react: "TextFieldLabel",
      svelte: "TextFieldLabel",
      vue: "TextFieldLabel",
    },
    description: "The label.",
    selector: ".ui-text-field .ui-label",
  },
  slots: [
    {
      description: "The label text.",
      name: "default",
    },
  ],
  source: "Field",
} satisfies ComponentApi
