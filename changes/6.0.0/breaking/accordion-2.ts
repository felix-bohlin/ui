import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Accordion` renders a chevron marker by default in Astro and Vue, hidden from screen readers with `aria-hidden="true"`. The `marker` slot on `AccordionSummary` replaces it, so move a custom chevron there and give it `.ui-marker`, or it shows twice. An empty `marker` slot shows the native arrow.',
  migrating: ["accordion"],
  notes: {
    accordion: slots(
      `a chevron marker by default. The <a href="#custom-marker"><code>marker</code> slot</a> on <code>AccordionSummary</code> replaces it, so move a custom chevron there with <code>.ui-marker</code> or it shows twice.`,
    ),
  },
} satisfies Change
