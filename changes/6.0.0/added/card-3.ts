import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` takes `density`: `spacious` (`.ui-spacious`) pads the parts with `--ui-space-5` for a card that stands alone, such as a sign-in form, and `dense` (`.ui-dense`) with `--ui-space-2` and a `--ui-space-2` gap for a small stat. The default is `normal`.",
  notes: {
    card: `<a href="#density"><code>density</code></a> takes <code>spacious</code> for a card that stands alone, such as a sign-in form, and <code>dense</code> for a small stat.`,
  },
} satisfies Change
