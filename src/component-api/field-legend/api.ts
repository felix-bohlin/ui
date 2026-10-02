import type { ComponentApi } from "../types"

export default {
  component: "FieldLegend",
  css: ["form"],
  options: [
    {
      default: '"legend"',
      description:
        'The element to render. Adds `.ui-legend` when not `"legend"`.',
      prop: "as",
    },
  ],
  page: "form",
  parts: [],
  root: {
    description: "The label of a fieldset.",
    selector: ":is(legend, .ui-legend)",
  },
  slots: [
    {
      description: "The label.",
      name: "default",
    },
  ],
  source: "FieldLegend",
} satisfies ComponentApi
