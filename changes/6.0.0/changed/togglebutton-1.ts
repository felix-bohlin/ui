import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` when checked is filled with `--ui-primary` (or `--ui-selected`) instead of a tint, and keeps the fill on hover, also in a `ToggleGroup`: it lightens a fill darker than L 0.3 and darkens the rest, like a filled `Button`, and doesn't change on a disabled button. Its focus ring takes `--ui-on-selected` (or `--ui-on-primary`), so the inset ring shows on the fill in dark mode.",
} satisfies Change
