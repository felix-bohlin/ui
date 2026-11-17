import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`layers.css` declares the `theme.palette`, `theme.base`, `theme.custom` and `theme.severity` sublayers. `theme.custom` is empty, for your own tokens: it beats the defaults in `theme.base` and loses to every component and utility. `theme.severity` holds the palette source of `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`, so a theme that sets `--ui-palette-source` on `.ui-palette` or `.ui-contrast-more` (bootstrap, brutalist and m3 do) no longer gives a severity class on the same element the theme's colors.",
} satisfies Change
