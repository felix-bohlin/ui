import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` uses `--ui-radius` (8px) instead of Open Props `--radius-2` (5px).",
  notes: {
    chip: `Corners are <a href="#api"><code>--ui-radius</code></a> (8px) instead of Open Props <code>--radius-2</code> (5px).`,
  },
} satisfies Change
