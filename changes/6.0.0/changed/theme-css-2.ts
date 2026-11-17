import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` `--ui-primary` is `oklch(0.499 0.191 222.8)` in light mode, with the hue of the palette source and a chroma that follows `--ui-palette-chroma` up to `0.191`, and `--ui-color-6` in dark mode, and `--ui-on-primary` is dark in dark mode, so text on primary and primary text both pass WCAG AA in light and dark.",
} satisfies Change
