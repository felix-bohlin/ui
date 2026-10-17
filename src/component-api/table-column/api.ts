import type { ComponentApi } from "../types"

export default {
  component: "TableColumn",
  options: [
    {
      cssVar: "width",
      description: "The column width, merged into `style`.",
      group: "Width",
      prop: "width",
    },
  ],
  page: "table",
  parts: [],
  root: {
    code: "<col>",
    description: "A column, inside `TableColumnGroup`.",
    selector: "col",
  },
  source: "Table",
} satisfies ComponentApi
