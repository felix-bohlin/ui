import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` severity scopes (`.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning`) take their hue from the intent tokens, and `.ui-neutral` its chroma too, so a theme's `--ui-success` reaches every success surface and its `--ui-neutral` every neutral one. `--ui-neutral` and the named colors set the lightness of palette steps 7 and 9 as a number instead of reading the element's own palette, so a severity class also keeps its palette on a `.ui-palette` or `.ui-contrast-more` element.",
} satisfies Change
