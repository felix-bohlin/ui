import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` with `variant="elevated"` uses `--ui-shadow-elevated`, the elevated `Card` shadow, which takes the darker `--ui-shadow-color` in dark mode.',
  notes: {
    accordion: `Elevated accordions use <a href="#api"><code>--ui-shadow-elevated</code></a>, the elevated card shadow, also in dark mode. Padding and gaps read the <code>--ui-space-*</code> scale.`,
  },
} satisfies Change
