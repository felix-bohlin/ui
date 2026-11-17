import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tooltip` in Astro and Vue takes `TooltipContent` instead of `label` and the `content` slot.",
  migrating: ["tooltip"],
  notes: {
    tooltip: slots(
      `<a href="#api"><code>TooltipContent</code></a> replaces <code>label</code> and the <code>content</code> slot.`,
    ),
  },
} satisfies Change
