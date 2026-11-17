import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry: "`List` `gutterless` (`.ui-gutterless`) is `flush` (`.ui-flush`).",
  migrating: ["list"],
  notes: {
    list: {
      ...slots(
        `<a href="#flush"><code>flush</code></a> replaces <code>gutterless</code>.`,
      ),
      html: `<a href="#flush"><code>.ui-flush</code></a> replaces <code>.ui-gutterless</code>.`,
    },
  },
} satisfies Change
