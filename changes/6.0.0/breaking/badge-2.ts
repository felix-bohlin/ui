import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Badge` `label` is a `string` (types), and `dot` and `hideLabel` require it. Pass a number as a string.",
  migrating: ["badge"],
  notes: {
    badge: slots(
      `<a href="#indicator"><code>label</code></a> is a string, and <code>dot</code> requires it.`,
    ),
  },
} satisfies Change
