import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TableCell` and `TableHeaderCell` take `numeric` (`.ui-numeric`): the cell aligns to the end and uses tabular figures, so the digits of a number column line up.",
  notes: {
    table: {
      default: `<a href="#numbers">Number columns</a> with <code>numeric</code> on <code>TableCell</code> and <code>TableHeaderCell</code>.`,
      html: `<a href="#numbers">Number columns</a> with <code>.ui-numeric</code> on the cells.`,
    },
  },
} satisfies Change
