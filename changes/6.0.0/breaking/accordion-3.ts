import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Accordion` and `Dialog` no longer render `.ui-card`, and `Badge` and `Tooltip` no longer render `.ui-anchor`. `card.css` and `anchor.css` style `.ui-accordion`, `.ui-dialog` and `.ui-tooltip` themselves, and `badge.css` positions `.ui-badge` without `anchor.css`, so HTML takes one root class. CSS that reached these components through `.ui-card` or `.ui-anchor` needs their own class.",
  migrating: ["accordion", "dialog"],
  notes: {
    accordion: {
      ...slots(
        `<code>Accordion</code> no longer renders <code>.ui-card</code>. Style <a href="#basics"><code>.ui-accordion</code></a> instead.`,
      ),
      html: `<code>.ui-card</code> is no longer needed on <a href="#basics"><code>.ui-accordion</code></a>, which <code>card.css</code> styles itself.`,
    },
    dialog: {
      ...slots(
        `<code>Dialog</code> no longer renders <code>.ui-card</code>. Style <a href="#basics"><code>.ui-dialog</code></a> instead.`,
      ),
      html: `<code>.ui-card</code> is no longer needed on <a href="#basics"><code>.ui-dialog</code></a>, which <code>card.css</code> styles itself.`,
    },
  },
} satisfies Change
