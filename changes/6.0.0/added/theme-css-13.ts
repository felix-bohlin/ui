import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`theme.css` declares every derived token (the color roles, the control, chip, choice and switch sizes, the spacing steps, the type roles and the radii) on `:where(html, .ui-palette, .ui-contrast-more)`, and the knobs (`--ui-palette-hue`, `--ui-density`, `--ui-space-scale`, the limits and strengths) on `html` only. A subtree with `class="ui-palette"` derives everything again from the knobs it sets or inherits, so `style="--ui-palette-hue: 30"` or `style="--ui-density: 0.875"` on it works. A theme sets its pinned roles on the same selector so the scopes keep them.',
} satisfies Change
