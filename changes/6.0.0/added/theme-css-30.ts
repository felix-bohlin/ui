import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-button-hover`. `layer` makes `Button` and `ControlGroup` show hover and pressed states as translucent state layers: the text color over filled and tonal buttons, the accent over outlined ones, which keep their text and border. Filled, tonal, primary and critical buttons use `--ui-state-hover-alpha-accent` and `--ui-state-active-alpha-accent`, and neutral outlined buttons the light and dark alphas. `shade-all` shades the fill of every filled and tonal button: filled ones as when unset, tonal ones with `--ui-surface-tonal-hover`, darker in light mode and lighter in dark mode, and a step further when pressed, while outlined ones fill with the accent as when unset. Unset, filled buttons shade their fill and outlined and tonal buttons fill with the accent, as before.",
} satisfies Change
