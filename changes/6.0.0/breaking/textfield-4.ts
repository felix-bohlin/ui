import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`TextField` and `Textarea` take `variant="filled"` like `Select` instead of the boolean `filled`. Replace `filled` with `variant="filled"`.',
  migrating: ["text-field", "textarea"],
  notes: {
    "text-field": slots(
      `<a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    ),
    textarea: slots(
      `<a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    ),
  },
} satisfies Change
