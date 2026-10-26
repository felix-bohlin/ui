import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Table",
  keyboard: [
    {
      description:
        'Moves focus to a scrolling table, or to its scroll box, when it has `tabindex="0"`. A table without one isn\'t a tab stop.',
      keys: ["Tab"],
    },
    {
      description:
        "Scrolls the focused table or scroll box a little at a time.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
    {
      description:
        "Scrolls a focused box that scrolls up and down, like the one around a sticky header, to the top or bottom, or by a page.",
      keys: ["Home", "End", "Page Up", "Page Down"],
    },
  ],
  notes: components(
    "Set column widths with `TableColumnGroup` and `TableColumn`.",
  ),
  options: [
    {
      default: '"normal"',
      description: "The cell padding.",
      group: "Density",
      prop: "density",
      values: { dense: ".ui-dense", normal: null, spacious: ".ui-spacious" },
    },
    {
      class: ".ui-flush",
      default: "false",
      description:
        "Drops the block margin, for a table that sits in a card or another padded box.",
      group: "Flush",
      prop: "flush",
    },
    {
      default: '"wrap"',
      description:
        'What the table does when its columns don\'t fit. `"wrap"` lets the cells wrap their text, and `"scroll"` keeps each cell on one line, scrolls the table sideways and lets the last column take the space left over. Give a scrolling table `tabindex="0"`, so keyboard users can scroll it.',
      group: "Overflow",
      prop: "overflow",
      values: { scroll: ".ui-overflow-scroll", wrap: null },
    },
    {
      class: ".ui-sticky-header",
      default: "false",
      description:
        "Keeps the header rows at the top of the nearest scroll container. Offset it with `--_sticky-offset`.",
      group: "Sticky header",
      prop: "stickyHeader",
    },
  ],
  parts: [
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
    {
      code: "<caption>",
      component: "TableCaption",
      description: "An optional title for the table.",
      selector: "caption",
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
