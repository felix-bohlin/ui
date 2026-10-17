import type { ComponentApi } from "../types"

export default {
  component: "TableColumnGroup",
  options: [],
  page: "table",
  parts: [],
  root: {
    code: "<colgroup>",
    component: {
      astro: "TableColumnGroup",
      react: "TableColumnGroup",
      svelte: "TableColumnGroup",
      vue: "TableColumnGroup",
    },
    description: "A group of columns, before the table head.",
    selector: "colgroup",
  },
  slots: [
    {
      description: "The `TableColumn`s.",
      name: "default",
    },
  ],
  source: "Table",
} satisfies ComponentApi
