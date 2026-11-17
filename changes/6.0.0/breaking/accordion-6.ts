import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` in Astro and Vue takes parts instead of slots: `AccordionSummary`, `AccordionContent` and `AccordionActions`. The root no longer wraps its children in `.ui-content`, and the `marker` slot moves to `AccordionSummary`.",
  migrating: ["accordion"],
  notes: {
    accordion: slots(
      `<a href="#basics"><code>AccordionSummary</code>, <code>AccordionContent</code></a> and <a href="#actions"><code>AccordionActions</code></a> replace the slots, and the root no longer wraps its children in <code>.ui-content</code>.`,
    ),
  },
} satisfies Change
