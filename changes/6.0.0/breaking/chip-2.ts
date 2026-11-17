import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Chip` no longer has a default slot. Pass the text as `label`, or rich content in the `label` slot, which renders in `.ui-text` like the prop.",
  migrating: ["chip"],
  notes: {
    chip: slots(
      `the default slot is gone. Pass the text as <a href="#api"><code>label</code></a>, or rich content in the <code>label</code> slot.`,
    ),
  },
} satisfies Change
