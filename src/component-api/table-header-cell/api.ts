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
    {
      attribute: "[data-sort]",
      default: "false",
      description:
        "Wraps the label in a `<button>` that sorts the table by this column, inside a `SortableTable`.",
      group: "Sortable",
      prop: "sortable",
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
