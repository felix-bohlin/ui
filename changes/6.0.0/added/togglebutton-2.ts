import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton`, `ToggleGroup`, outlined `Chip` and the outlined `Tabs` track read `--ui-control-border-color` for their border, like outlined buttons, so one token outlines every unfilled control. They keep their current border when a theme doesn't set it.",
  notes: {
    toggle: `<code>ToggleButton</code> and <code>ToggleGroup</code> read <a href="#api"><code>--ui-control-border-color</code></a> for their border, like outlined buttons.`,
  },
} satisfies Change
