import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`SortableTable` component (`opui-sortable-table.ui-sortable-table`, `display: contents`), documented on the Table page, and `sortable` on `TableHeaderCell` (`th[data-sort]`), which puts the label in a `<button>`. A press sorts the body rows by that column, counted across the `colspan` and `rowspan` of the header cells before it, with `Intl.Collator` and `numeric: true`, from a cell's `data-sort-value` or its text, ascending first, sets `aria-sort` on the header and announces the column and the direction (\"Moons, sorted ascending\"), which `ascendingLabel` and `descendingLabel` (`ascending-label` and `descending-label`) translate, with `{column}` where the header's label goes. It fires a cancelable `sort` event first (`onSort` in React, `onsort` in Svelte, `@sort` in Vue), so a framework can sort its own data, and the React component passes a `ref` on to the element. `sortable-table.css` draws the sort arrow. The component renders the live region it announces in, so React leaves its text alone, and the React component ignores header clicks until it has hydrated, so a sort before hydration no longer moves the rows React is about to hydrate or happens without `onSort`. In HTML without the live region the element adds one.",
  notes: {
    table: {
      default: `<a href="#sorting">Sorting</a>: <code>SortableTable</code> and <code>sortable</code> header cells sort the rows by a column, set <code>aria-sort</code> and fire a cancelable <code>sort</code> event, with the <code>&lt;opui-sortable-table&gt;</code> custom element, which the component loads. <code>ascendingLabel</code> and <code>descendingLabel</code> translate what it announces.`,
      html: `<a href="#sorting">Sorting</a>: <code>&lt;opui-sortable-table&gt;</code> sorts the rows by a header marked <code>data-sort</code>, sets <code>aria-sort</code> and fires a cancelable <code>sort</code> event. Import <code>opui-css/elements/sortable-table.js</code>. <code>ascending-label</code> and <code>descending-label</code> translate what it announces.`,
    },
  },
} satisfies Change
