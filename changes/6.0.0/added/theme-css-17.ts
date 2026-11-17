import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-primary-source`, the color `--ui-primary` is derived from within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Themes set it to their brand color so more contrast darkens or lightens the primary without changing its hue; setting `--ui-primary` pins it. The example themes set it instead of `--ui-primary`, `--ui-on-primary` and `--ui-primary-text`, so their primary, its text and the text on it follow more contrast (brutalist pins `--ui-primary-text` to its text color for black links). The named colors, `--ui-neutral`, `--ui-invalid`, `--ui-text`, `--ui-text-disabled`, `--ui-border-color` and `--ui-field-border-color` are formulas of the knobs too, so the same values come out at normal contrast and a theme that changes `--ui-text-strong` or `--ui-surface` moves them along.",
} satisfies Change
