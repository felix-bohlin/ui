import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button` with `aria-current="page"` stands out from the other pages in every variant and theme. In a filled `ControlGroup` it drops its fill and reads like a text button, where it kept the light text of the fill on a pale tint. Text and outlined buttons take `--_accent` at `--ui-state-selected-alpha-accent` instead of the pressed tint, tonal ones shade their fill by that alpha away from the text, and all three use `--ui-text-strong`, where the current page barely differed from tonal neighbors in some themes and lowered gray text under 4.5:1. A filled, outlined or tonal `Button` outside a group shows the current page too, like one in a group.',
} satisfies Change
