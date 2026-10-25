import type { ComponentApi } from "../types"

export default {
  component: "TableHeaderCell",
  options: [
    {
      class: ".ui-numeric",
      default: "false",
      description:
        "Aligns the header to the end, over a column of `numeric` cells.",
      group: "Numeric",
      prop: "numeric",
    },
  ],
  page: "table",
  parts: [],
  root: {
    code: "<th>",
    description: "A header cell, inside `TableRow`.",
    selector: "th",
  },
  slots: [
    {
      description: "The header content.",
      name: "default",
    },
  ],
  source: "Table",
} satisfies ComponentApi
