import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion`, `Avatar`, `Divider`, `List`, `Progress`, `Range`, `Select`, `Switch`, `Tabs`, `Textarea`, `TextField` and `ToggleButton` keep their state visible in forced colors mode: selected tabs, toggles and list items use `SelectedItem`, with `SelectedItemText` for a list item's description too, switches, ranges, progress bars and dividers are drawn with system colors, focused fields get a `Highlight` outline, elevated and tonal accordions get a `CanvasText` border, and letter avatars an outline.",
} satisfies Change
