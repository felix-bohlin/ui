import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Card` `variant="text"` is `variant="transparent"` (`.ui-transparent` instead of `.ui-text`), so `.ui-text` only names the text part of a component. The default card is named `plain`.',
  migrating: ["card"],
  notes: {
    card: {
      ...slots(
        `<code>variant="text"</code> is <a href="#variants"><code>variant="transparent"</code></a>.`,
      ),
      html: `<code>.ui-text</code> on a card is <a href="#variants"><code>.ui-transparent</code></a>.`,
    },
  },
} satisfies Change
