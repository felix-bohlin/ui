import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` `variant="default"` is gone. An accordion without a variant is `plain`, the page surface with padding and no border, like a `Card`, and a group card without a variant pads its accordions too. Use `variant="transparent"` (`.ui-transparent`) for the previous look, with no surface or padding.',
  migrating: ["accordion"],
  notes: {
    accordion: {
      ...slots(
        `an accordion without a <a href="#variants">variant</a> is <code>plain</code>, the page surface with padding, like a card. <code>variant="default"</code> is gone: use <code>variant="transparent"</code> for the previous look.`,
      ),
      html: `an accordion without a <a href="#variants">variant class</a> has the page surface and padding, like a card. Add <code>.ui-transparent</code> for the previous look.`,
    },
  },
} satisfies Change
