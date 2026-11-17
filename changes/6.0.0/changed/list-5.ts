import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List` selected and current rows and options, checked `option`s included, have a bar on their start edge in `--ui-selected-strong`, or a check at the end instead in a `Menu`, a `role="listbox"` list and a `Select` picker, and a stronger fill than hover (`--ui-state-selected-alpha-accent`, the hover tint with more contrast), so they no longer differ from a hovered row by a tint alone. Images and videos in `.ui-start` are `3.5rem` and `4rem` instead of `56px` and `64px`.',
  notes: {
    list: [
      `A checked <a href="#radio">option</a> uses <code>--ui-state-selected-alpha-accent</code>.`,
      `<a href="#selected">Selected and current rows</a> have a bar on their start edge in <code>--ui-selected-strong</code> and a stronger fill than hover, so they don't rely on a tint alone. In a <code>role="listbox"</code> list, the selected option gets a check at the end instead.`,
    ],
  },
} satisfies Change
