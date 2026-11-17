import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Chip` styles a button chip with `aria-pressed="true"` as pressed, for filters and choices: filled with `--ui-selected`, or `--ui-primary`, under `--ui-on-selected` text like a checked `ToggleButton`, lighter or darker on hover like a filled button, dimmed with `--ui-disabled-opacity` and without the hover when disabled or `aria-disabled="true"`, and `SelectedItem` in forced colors, with a `SelectedItemText` dot. `--_selected-bg-color` sets the fill. In print, `print-color-adjust: exact` keeps it.',
  notes: {
    chip: `<a href="#pressed">Pressed</a> button chips (<code>aria-pressed="true"</code>) are filled with <code>--ui-selected</code>, or <code>--ui-primary</code>, like a checked toggle button.`,
  },
} satisfies Change
