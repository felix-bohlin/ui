import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Table` exports a props type for every part from `opui-css/astro`, `opui-css/react`, `opui-css/svelte` and `opui-css/vue`: `TableBodyProps`, `TableCaptionProps`, `TableCellProps`, `TableColumnGroupProps`, `TableFootProps`, `TableHeadProps`, `TableHeaderCellProps` and `TableRowProps`.",
  notes: {
    table: components(
      `<a href="#api">Every part</a> has its own props type, such as <code>TableBodyProps</code> and <code>TableCellProps</code>, exported from every framework.`,
    ),
  },
} satisfies Change
