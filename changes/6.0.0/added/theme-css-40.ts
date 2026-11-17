import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-focus-border-width`, the border width of a focused `Checkbox` and `Radio` and of the field of a focused `NumberField`, `Select`, `Textarea` and `TextField`, never thinner than their own border, so the focus edge can thicken, and, when wider than the ring, the bar under a highlighted link. The extra width grows inward, so the check, the dot and the text don't move, and forced colors keep the wider border.",
} satisfies Change
