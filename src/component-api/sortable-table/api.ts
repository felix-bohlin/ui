import { elementNotes } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const sortEvent =
  "Called before the rows are sorted, with the column index, the direction and the header in `event.detail`. `preventDefault()` keeps the rows where they are."

export default {
  component: "SortableTable",
  css: ["sortable-table"],
  elements: [
    {
      members: [
        {
          description:
            "Fires before the rows move, with the column index, the direction and the header in `event.detail`. It bubbles, and `preventDefault()` keeps the rows where they are.",
          kind: "event",
          name: "sort",
        },
        {
          description:
            'Sorts by the column of `header`, in `direction` (`"ascending"` or `"descending"`), or else the other way from its `aria-sort`, ascending first. It fires `sort`, sets `aria-sort` and announces the order.',
          kind: "method",
          name: "sort(header, direction)",
        },
        {
          description: "The `<table>` inside, or `null`. Read-only.",
          kind: "property",
          name: "table",
        },
      ],
      tag: "opui-sortable-table",
    },
  ],
  notes: {
    ...elementNotes(
      "sortable-table.js",
      "The element moves the rows it sorts, so when the framework renders the rows from data, call `preventDefault()` on the `sort` event and sort the data instead.",
    ),
    html: 'Wrap the table in `<opui-sortable-table class="ui-sortable-table">`, add `data-sort` to each sortable header with a `<button type="button">` around its label, and import `opui-css/elements/sortable-table.js`. A cell sorts by its `data-sort-value`, or else its text.',
  },
  options: [
    {
      description: sortEvent,
      frameworks: ["vue"],
      prop: "@sort",
    },
    {
      attribute: "[ascending-label]",
      default: '"{column}, sorted ascending"',
      description:
        "What a sort in ascending order announces, with `{column}` where the header's label goes.",
      group: "Ascending label",
      prop: "ascendingLabel",
    },
    {
      attribute: "[descending-label]",
      default: '"{column}, sorted descending"',
      description:
        "What a sort in descending order announces, with `{column}` where the header's label goes.",
      group: "Descending label",
      prop: "descendingLabel",
    },
    {
      description: sortEvent,
      frameworks: ["svelte"],
      prop: "onsort",
    },
    {
      description: sortEvent,
      frameworks: ["react"],
      prop: "onSort",
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
      'The `<opui-sortable-table>` custom element, `display: contents`, around the table. It moves the body rows and announces the new order in its `role="status"` child, or one it adds. While it has `data-hydrating`, which the React component renders until it hydrates, header clicks do nothing.',
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
