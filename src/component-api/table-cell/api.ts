import type { ComponentApi } from "../types"

export default {
  component: "TableCell",
  options: [
    {
      class: ".ui-numeric",
      default: "false",
      description:
        "Aligns the cell to the end and uses tabular figures, so the digits of a column line up.",
      group: "Numeric",
      prop: "numeric",
    },
  ],
  page: "table",
  parts: [],
  root: {
    code: "<td>",
    description: "A data cell, inside `TableRow`.",
    selector: "td",
  },
  slots: [
    {
      description: "The cell content.",
      name: "default",
    },
  ],
  source: "Table",
} satisfies ComponentApi
