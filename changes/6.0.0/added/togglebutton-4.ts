import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` when checked, the selected `ToggleGroup` item, and selected or current `List` items and `Select` options read the optional `--ui-selected` and `--ui-on-selected`. When unset, toggles are filled with `--ui-primary` and List items and Select options get a primary tint. m3 and shadcn set them to their tonal surface. Descriptions on a selected or current row read `--ui-on-selected` too.",
} satisfies Change
