import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` has rounded corners (`--_radius`, `--ui-radius`) and clips its rows to them, but still draws the focus ring of a control in `.ui-start` or `.ui-end` of a `.ui-flush` row inside it. As a direct child of a `Card`, `Accordion` or `Dialog` it stays square, since they round and clip it.",
  notes: {
    list: `Lists are <a href="#variants">rounded</a> with <code>--_radius</code> (<code>--ui-radius</code>) and clip their rows to the corners, except as a direct child of a card.`,
  },
} satisfies Change
