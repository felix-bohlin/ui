import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` keyboard shortcuts in `.ui-end` pass contrast: a `kbd` takes the description color, `--ui-on-selected` in a selected row, instead of 70% opacity.",
  notes: {
    list: [
      `Themes can set <a href="#api"><code>--ui-list-item-padding-inline</code></a>. Descriptions read <code>--ui-text-subtle</code>, and <code>--ui-on-selected</code> on a selected row.`,
      `Selected and current items read <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    ],
  },
} satisfies Change
