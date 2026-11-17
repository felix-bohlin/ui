import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Anchor` in Astro and Vue takes `AnchorContent` instead of the `anchored` slot. Without it, no floating element renders. With `trigger="hover"`, `AnchorContent` takes the anchor\'s `id` and `popover="hint"` over its own in every framework and warns in development when it gets others, and in an anchor that always shows it, it keeps its own.',
  migrating: ["anchor"],
  notes: {
    anchor: slots(
      `<a href="#api"><code>AnchorContent</code></a> replaces the <code>anchored</code> slot.`,
    ),
  },
} satisfies Change
