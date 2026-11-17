import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` `flush` (`.ui-flush`) also drops the block padding of the list, like `Table` `flush` drops its margin, so a flush list in a card sits on the card padding.",
  notes: {
    list: `<a href="#flush"><code>flush</code></a> also drops the block padding of the list, for a list in a card.`,
  },
} satisfies Change
