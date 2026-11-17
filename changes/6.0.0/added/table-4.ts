import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Table` takes `flush` (`.ui-flush`), which drops its block margin for a table in a card or another padded box, and `overflow="scroll"` (`.ui-overflow-scroll`), which keeps each cell on one line and scrolls the table sideways when the columns don\'t fit. The last column takes the space left over. A scrolling table needs `tabindex="0"`, and draws its focus ring inside, so a card doesn\'t clip it.',
  notes: {
    table: {
      default: `<a href="#in-a-card">Tables in a card</a>: <code>flush</code> drops the block margin and <code>overflow="scroll"</code> scrolls the columns sideways.`,
      html: `<a href="#in-a-card">Tables in a card</a>: <code>.ui-flush</code> drops the block margin and <code>.ui-overflow-scroll</code> scrolls the columns sideways.`,
    },
  },
} satisfies Change
