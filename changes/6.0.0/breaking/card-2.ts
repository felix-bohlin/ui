import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` in Astro and Vue takes parts instead of slots: `CardHeader`, `CardContent` and `CardActions`. `actionsAlign` is `align` on `CardActions`.",
  migrating: ["card"],
  notes: {
    card: slots(
      `<a href="#api"><code>CardHeader</code>, <code>CardContent</code> and <code>CardActions</code></a> replace the slots, and <code>align</code> on <code>CardActions</code> replaces <code>actionsAlign</code>.`,
    ),
  },
} satisfies Change
