import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card`, `Accordion`, `Dialog` and `Drawer` content (`.ui-content`) is a stack: a grid with `--ui-space-3` between its children, which lose their block margins, so a body with a heading, a paragraph and a list needs no CSS of its own. Content with inline children (links, `strong`, chips, buttons) or a `Carousel` keeps the normal flow, and rich text content (`.ui-content.ui-rich-text`) keeps its own spacing. The rules have no specificity, so a `display` or `gap` set on the content wins.",
  notes: {
    accordion: {
      ...components(
        `<a href="#basics"><code>AccordionContent</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, like card content, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
      ),
      html: `<a href="#basics"><code>.ui-content</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, like card content, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
    },
    card: {
      ...components(
        `<a href="#variants"><code>CardContent</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
      ),
      html: `<a href="#variants"><code>.ui-content</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
    },
    dialog: {
      ...components(
        `<a href="#basics"><code>DialogContent</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, like <code>Drawer</code> content, so paragraphs don't touch. Content with inline children keeps the normal flow.`,
      ),
      html: `<a href="#basics"><code>.ui-content</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, like <code>Drawer</code> content, so paragraphs don't touch. Content with inline children keeps the normal flow.`,
    },
  },
} satisfies Change
