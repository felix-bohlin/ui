import type { ComponentApi } from "../types"

export default {
  component: "FieldDescription",
  options: [],
  parts: [],
  root: {
    description: "Supporting text for a fieldset.",
    selector: ".ui-field-description",
  },
  slots: [
    {
      description: "The text.",
      name: "default",
    },
  ],
  source: "FieldDescription",
} satisfies ComponentApi
