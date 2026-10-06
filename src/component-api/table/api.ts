import type { ComponentApi } from "../types"

export default {
  component: "Table",
  notes: {
    astro:
      "Set column widths with `Table.ColumnGroup` and `Table.Column`, which takes a `width`.",
    solid:
      "Set column widths with `TableColumnGroup` and `TableColumn`, which takes a `width`.",
    vue: "Set column widths with `TableColumnGroup` and `TableColumn`, which takes a `width`.",
  },
  options: [
    {
      class: ".ui-sticky-header",
      default: "false",
      description:
        "Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`.",
      group: "Sticky header",
      prop: "stickyHeader",
    },
    {
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { dense: ".ui-dense", spacious: ".ui-spacious" },
    },
  ],
  parts: [
    {
      code: "<thead>",
      component: { astro: "Table.Head", solid: "TableHead", vue: "TableHead" },
      description: "The header rows.",
      selector: "thead",
    },
    {
      code: "<th>",
      component: {
        astro: "Table.HeaderCell",
        solid: "TableHeaderCell",
        vue: "TableHeaderCell",
      },
      description: "A header cell.",
      selector: "thead th:first-child",
    },
    {
      code: "<tbody>",
      component: { astro: "Table.Body", solid: "TableBody", vue: "TableBody" },
      description: "The body rows.",
      selector: "tbody",
    },
    {
      code: "<tr>",
      component: { astro: "Table.Row", solid: "TableRow", vue: "TableRow" },
      description: "A row.",
      selector: "tbody tr:first-child",
    },
    {
      code: "<td>",
      component: { astro: "Table.Cell", solid: "TableCell", vue: "TableCell" },
      description: "A data cell.",
      selector: "tbody tr:first-child td:last-child",
    },
  ],
  root: {
    description: "Container element.",
    selector: "table.ui-table",
  },
  slots: [
    {
      description: "The table sections.",
      name: "default",
    },
  ],
  source: "Table",
} satisfies ComponentApi
