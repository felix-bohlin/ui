import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Table",
  notes: components(
    "Set column widths with `TableColumnGroup` and `TableColumn`.",
  ),
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
      code: "<caption>",
      component: "TableCaption",
      description: "An optional title for the table.",
      selector: "caption",
    },
    {
      code: "<thead>",
      component: "TableHead",
      description: "The header rows.",
      selector: "thead",
    },
    {
      code: "<th>",
      component: "TableHeaderCell",
      description: "A header cell.",
      selector: "thead th:first-child",
    },
    {
      code: "<tbody>",
      component: "TableBody",
      description: "The body rows.",
      selector: "tbody",
    },
    {
      code: "<tr>",
      component: "TableRow",
      description: "A row.",
      selector: "tbody tr:first-child",
    },
    {
      code: "<td>",
      component: "TableCell",
      description: "A data cell.",
      selector: "tbody tr:first-child td:last-child",
    },
    {
      code: "<tfoot>",
      component: "TableFoot",
      description: "Optional footer rows, such as totals.",
      selector: "tfoot",
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
