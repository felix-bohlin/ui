import type { ComponentApi } from "../types"

export default {
  component: "Table",
  notes: {
    astro: "Set column widths with `TableColumnGroup` and `TableColumn`.",
    react: "Set column widths with `TableColumnGroup` and `TableColumn`.",
    svelte: "Set column widths with `TableColumnGroup` and `TableColumn`.",
    vue: "Set column widths with `TableColumnGroup` and `TableColumn`.",
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
      code: "<caption>",
      component: {
        astro: "TableCaption",
        react: "TableCaption",
        svelte: "TableCaption",
        vue: "TableCaption",
      },
      description: "An optional title for the table.",
      selector: "caption",
    },
    {
      code: "<thead>",
      component: {
        astro: "TableHead",
        react: "TableHead",
        svelte: "TableHead",
        vue: "TableHead",
      },
      description: "The header rows.",
      selector: "thead",
    },
    {
      code: "<th>",
      component: {
        astro: "TableHeaderCell",
        react: "TableHeaderCell",
        svelte: "TableHeaderCell",
        vue: "TableHeaderCell",
      },
      description: "A header cell.",
      selector: "thead th:first-child",
    },
    {
      code: "<tbody>",
      component: {
        astro: "TableBody",
        react: "TableBody",
        svelte: "TableBody",
        vue: "TableBody",
      },
      description: "The body rows.",
      selector: "tbody",
    },
    {
      code: "<tr>",
      component: {
        astro: "TableRow",
        react: "TableRow",
        svelte: "TableRow",
        vue: "TableRow",
      },
      description: "A row.",
      selector: "tbody tr:first-child",
    },
    {
      code: "<td>",
      component: {
        astro: "TableCell",
        react: "TableCell",
        svelte: "TableCell",
        vue: "TableCell",
      },
      description: "A data cell.",
      selector: "tbody tr:first-child td:last-child",
    },
    {
      code: "<tfoot>",
      component: {
        astro: "TableFoot",
        react: "TableFoot",
        svelte: "TableFoot",
        vue: "TableFoot",
      },
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
