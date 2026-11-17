import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` standalone and `Chip` outlined take `--ui-shadow-control` like buttons (none by default), and toggle corners are capped at half the control height, those of a `ToggleGroup` at half the height of its size, so a round `--ui-button-radius` doesn't clip grouped toggles.",
  notes: {
    toggle: [
      `A <a href="#toggle-button">standalone toggle</a> takes <code>--ui-shadow-control</code> like buttons, and corners are capped at half the height so a round radius doesn't clip <a href="#toggle-group">groups</a>.`,
      `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    ],
  },
} satisfies Change
