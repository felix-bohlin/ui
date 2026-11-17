import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio` and `Switch` take `card` (`.ui-card`), which renders the control as a card styled by `card.css`: outlined by default, tinted when hovered and when checked, with the focus ring on the card. `variant` (`outlined`, `tonal` or `elevated`) changes the surface. Cards in a horizontal `FieldGroup` share the row equally, and a card keeps its layout whichever of `card.css` and `choice.css` is imported first. `--_hover-bg-color`, `--_padding` and `--_selected-bg-color` are the knobs. The checked fill is the control's accent at `--ui-state-selected-alpha-accent`, so the fill, the border and the checked input share one color (red when invalid), and more contrast lowers the alpha so the label and end text keep 7:1 in dark mode.",
  notes: {
    checkbox: {
      default: `<a href="#cards">Cards</a> with the <code>card</code> prop, <code>spread</code> for the input at the end, and <code>variant="tonal"</code> or <code>"elevated"</code>.`,
      html: `<a href="#cards">Cards</a> with <code>.ui-card</code> on the label, plus <code>.ui-spread</code>, <code>.ui-tonal</code> or <code>.ui-elevated</code>.`,
    },
    switch: {
      default: `<a href="#cards">Cards</a> with the <code>card</code> prop, <code>spread</code> for the input at the end, and <code>variant="tonal"</code> or <code>"elevated"</code>.`,
      html: `<a href="#cards">Cards</a> with <code>.ui-card</code> on the label, plus <code>.ui-spread</code>, <code>.ui-tonal</code> or <code>.ui-elevated</code>.`,
    },
  },
} satisfies Change
