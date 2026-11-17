import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-button-accent-filled` and `--ui-button-on-accent-filled`, the fill and text of filled `Button`s and `ControlGroup`s without `.ui-primary` or `.ui-critical`, and of hovered outlined and tonal ones (`--ui-button-accent` and `--ui-button-on-accent` when unset). brutalist fills its buttons with the main blue while text and outlined buttons stay black.",
} satisfies Change
