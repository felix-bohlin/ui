import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "SortableTable",
  css: ["sortable-table"],
  notes: {
    ...components(
      "The component loads `opui-css/elements/sortable-table.js`. In React, Svelte and Vue it runs once the component hydrates, or once the page imports the module. The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead. `data-ascending` and `data-descending` on the root translate the words it announces.",
    ),
    html: 'Wrap the table in `<opui-sortable-table class="ui-sortable-table">`, add `data-sort` to each sortable header with a `<button type="button">` around its label, and import `opui-css/elements/sortable-table.js`. A cell sorts by its `data-sort-value`, or else its text. `data-ascending` and `data-descending` on the root translate the words it announces.',
  },
  options: [
    {
      description:
        "Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are.",
      frameworks: ["react"],
      prop: "onSort",
    },
    {
      description:
        "Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are.",
      frameworks: ["svelte"],
      prop: "onsort",
    },
  ],
  page: "table",
  parts: [
    {
      code: "th[data-sort] > button",
      component: "TableHeaderCell",
      description:
        "The button around a sortable header's label. A press sorts by its column, ascending first, and sets `aria-sort` on the header.",
      selector: "th[data-sort] > button",
    },
  ],
  root: {
    description:
      "The `<opui-sortable-table>` custom element, `display: contents`, around the table. It fires a cancelable `sort` event, moves the body rows and announces the new order.",
    selector: "opui-sortable-table.ui-sortable-table",
  },
  slots: [
    {
      description: "The `Table`.",
      name: "default",
    },
  ],
  source: "SortableTable",
} satisfies ComponentApi
