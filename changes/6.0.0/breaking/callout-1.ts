import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Callout` in Astro and Vue no longer renders `role="note"`, so screen readers announce the `<article>` it is. Add `role="note"` to the root to keep the old announcement.',
  migrating: ["callout"],
  notes: {
    callout: slots(
      `no <code>role="note"</code>, so screen readers announce the <a href="#accessibility"><code>&lt;article&gt;</code></a> it is. Add <code>role="note"</code> to keep the old announcement.`,
    ),
  },
} satisfies Change
