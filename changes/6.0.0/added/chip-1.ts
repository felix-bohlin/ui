import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Chip` supports `aria-disabled="true"` on a link chip. A static chip takes `.ui-disabled` for an inactive look, since a `div` can\'t carry a disabled state.',
  notes: {
    chip: `<a href="#disabled">Disabled</a> chips: <code>aria-disabled="true"</code> on a link chip, and <code>.ui-disabled</code> for an inactive static chip.`,
  },
} satisfies Change
