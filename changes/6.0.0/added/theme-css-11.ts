import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds state and text tokens: `--ui-disabled-opacity`, `--ui-state-hover-alpha-light`, `--ui-state-hover-alpha-dark`, `--ui-state-active-alpha-light`, `--ui-state-active-alpha-dark`, `--ui-state-hover-alpha-accent`, `--ui-state-active-alpha-accent`, `--ui-text-disabled`, `--ui-invalid`, `--ui-font-weight-normal`, `--ui-font-weight-medium`, `--ui-font-weight-semibold` and `--ui-font-weight-bold`. A disabled control without a fill (text and outlined `Button`, `Chip`, an unchecked `ToggleButton`) takes `--ui-text-disabled` for its text and border and no opacity; filled and tonal controls and a checked toggle take `--ui-disabled-opacity`, so a disabled label is never dimmed twice. It also adds `--ui-state-selected-alpha-accent` (`25%`, `15%` with more contrast), the alpha of the primary tint behind selected `List` rows, `Select` options and checked choice cards when `--ui-selected` or `--ui-primary-tonal` is unset.",
} satisfies Change
