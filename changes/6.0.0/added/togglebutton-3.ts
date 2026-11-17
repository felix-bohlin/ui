import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` when checked, `Chip` without `.ui-outlined` and the `Carousel` buttons read `--ui-control-border-color-filled` for their border, like filled buttons.",
  notes: {
    toggle: `A <a href="#toggle-button">checked <code>ToggleButton</code></a> reads <code>--ui-control-border-color-filled</code> for its border, like filled buttons.`,
  },
} satisfies Change
