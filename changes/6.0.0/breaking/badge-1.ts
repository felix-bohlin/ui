import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Badge` `alignment` is `corner`, since it picks a corner of the child. The classes are unchanged.",
  migrating: ["badge"],
  notes: {
    badge: slots(
      `<code>alignment</code> is <a href="#corners"><code>corner</code></a>.`,
    ),
  },
} satisfies Change
