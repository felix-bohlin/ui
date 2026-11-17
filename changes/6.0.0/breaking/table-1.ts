import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Table` `variant` is `density` (`"dense"`, `"normal"`, `"spacious"`), so `variant` only names a surface. The classes are unchanged.',
  migrating: ["table"],
  notes: {
    table: slots(
      `<code>variant</code> is <a href="#density"><code>density</code></a>, with <code>normal</code> as the default.`,
    ),
  },
} satisfies Change
