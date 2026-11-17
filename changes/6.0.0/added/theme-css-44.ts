import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-choice-checked`. `mark` makes a checked `Checkbox` and `Radio` keep the surface and border of the unchecked input and draw the check, dash or dot in the choice accent, lifted to text lightness in dark mode. When unset (`fill`), they fill with the accent as before. Forced colors always fill, and `Switch` and checkbox and radio cards don't read it.",
} satisfies Change
