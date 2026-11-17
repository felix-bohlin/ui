import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` captions, `Tooltip` text and keyboard hints in buttons use `--ui-line-height-tight` (1.25) instead of 1.3 and 1.2.",
  notes: {
    card: `Captions use <a href="#api"><code>--ui-line-height-tight</code></a> (1.25), shared with tooltip text and keyboard hints.`,
  },
} satisfies Change
