import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar`, `Badge`, `Button`, `Checkbox`, `Chip`, `List`, `Progress`, `Radio`, `Range`, `Switch`, `Tabs`, `ToggleButton`, `Tooltip` and `Typography` keep their fills in print with `print-color-adjust: exact`, also when the browser doesn't print backgrounds, so text on a fill no longer prints pale on white paper and a state no longer disappears: letter and icon avatars, badge counts and dots, filled buttons, checked checkboxes, radios and switches, tonal chips, selected list items, the progress and range fill, the selected tab, checked toggle buttons, tooltips, `kbd`, `var`, `.ui-kbd` and `.ui-var`.",
} satisfies Change
