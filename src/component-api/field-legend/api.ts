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
    {
      description:
        "The id of the legend. Inside a `Fieldset` rendered with `as`, the legend takes the fieldset's generated id instead, unless the fieldset has `aria-label` or `aria-labelledby`.",
      inherited: true,
      prop: "id",
      type: "string",
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
