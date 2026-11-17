import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Divider` variants render `.ui-filled` and `.ui-tonal` instead of `.ui-border-filled` and `.ui-border-tonal`, and `variant="primary"` is `color="primary"`, which renders `.ui-primary` instead of `.ui-border-primary`. A primary line keeps its color with any variant.',
  migrating: ["divider"],
  notes: {
    divider: [
      {
        html: `<a href="#variants"><code>.ui-filled</code>, <code>.ui-primary</code> and <code>.ui-tonal</code></a> replace the <code>.ui-border-*</code> classes.`,
      },
      slots(
        `<code>variant="primary"</code> is <a href="#variants"><code>color="primary"</code></a>.`,
      ),
    ],
  },
} satisfies Change
