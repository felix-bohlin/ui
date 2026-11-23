import type { ComponentApi } from "../types"

export default {
  component: "Divider",
  options: [
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-border-filled",
        primary: ".ui-border-primary",
        tonal: ".ui-border-tonal",
      },
    },
  ],
  parts: [],
  root: {
    description: "The divider line.",
    selector: "hr.ui-divider",
  },
  source: "Divider",
} satisfies ComponentApi
