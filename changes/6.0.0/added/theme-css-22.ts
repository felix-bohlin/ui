import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` has `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised`, the borders inside tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity, and `--ui-border-color-on-filled`, the border inside lists without a variant and table headers. `--ui-border-color-on-raised` is the border mix of `--ui-border-color` and `--ui-field-border-color-on-raised` the field border mix, both against `--ui-surface-elevated`, in both modes, so dividers and field borders inside those surfaces stay visible in dark mode. `--ui-field-border-color-on-filled` is the field border mix against `--ui-surface-filled`. Each of those components sets `--ui-border-color` and `--ui-field-border-color` to the pair on its own root, so `theme.css` names no component. A theme that wants another border on raised surfaces, such as the page background in dark mode, sets the `-on-raised` tokens.",
} satisfies Change
