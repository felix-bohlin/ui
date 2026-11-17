import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List` no longer styles `[aria-selected="true"]` on a row\'s `li`, `a`, `button` or `label`, where ARIA doesn\'t allow it. Mark the current row with `aria-current="page"`. Options (`option` and `[role="option"]`) keep the selected style.',
  migrating: ["list"],
  notes: {
    list: `rows no longer style <code>aria-selected="true"</code> on a link, button, label or list item, where ARIA doesn't allow it. Mark the current row with <a href="#selected"><code>aria-current="page"</code></a>.`,
  },
} satisfies Change
