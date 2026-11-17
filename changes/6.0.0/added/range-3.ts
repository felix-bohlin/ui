import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` has a `--_track-base-bg-color` property for the empty track at rest. The pressed and disabled states override it.",
  notes: {
    range: `<a href="#component-properties"><code>--_track-base-bg-color</code></a> sets the empty track at rest, so filled and tonal tracks darken on press and take the disabled color.`,
  },
} satisfies Change
