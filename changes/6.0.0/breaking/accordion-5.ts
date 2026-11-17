import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` in Astro and Vue no longer renders `role="region"` and `aria-labelledby` on the content or `aria-controls` on the `summary`. `details` and `summary` expose the disclosure on their own, so add the attributes yourself only where the content should be a named region.',
  migrating: ["accordion"],
  notes: {
    accordion: slots(
      `no <code>role="region"</code>, <code>aria-labelledby</code> or <code>aria-controls</code>. <a href="#accessibility"><code>details</code> and <code>summary</code></a> announce the disclosure on their own.`,
    ),
  },
} satisfies Change
