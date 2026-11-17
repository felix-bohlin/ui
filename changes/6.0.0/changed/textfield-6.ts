import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Textarea` and `Select` fit a `.ui-button` in `.ui-start` or `.ui-end` to the field's height, or to the control's first line in a `Textarea` and in a field with `.ui-top` or `.ui-bottom`, and center it there, `--_affix-padding-block` from the border above and below and `--ui-space-1` at the sides. That's `--ui-space-1`, less where it leaves no room for `--ui-target-min-size` (24px), the minimum target size, which the button never goes under. It doesn't make the field taller unless that box is under 24px. Then the button starts at the box's top, and the field grows to fit it, as an x-small one does at `--ui-density: 0.875` or with `.ui-top` or `.ui-bottom`, and a small one at `0.75`. In a `Textarea`, content taller than the first line starts `--_affix-padding-block` below the field's top, or below `.ui-top`, instead of 8px, the text's padding, which also hung a button below the first line.",
} satisfies Change
