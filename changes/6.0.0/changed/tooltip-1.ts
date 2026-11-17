import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tooltip` without an arrow scales in from `0.96` as it fades, like `Menu`. Tooltips with `.ui-arrow` only fade, since a scale would move the arrow's containing block. Every tooltip opens with `--ui-ease-enter` and closes with `--ui-ease-exit`, also in the compat layer.",
  notes: {
    tooltip: `A <a href="#basics">tooltip</a> scales in as it fades and closes with <code>--ui-ease-exit</code>, like a menu. One with an <a href="#arrow">arrow</a> only fades.`,
  },
} satisfies Change
