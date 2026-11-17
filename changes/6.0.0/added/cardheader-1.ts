import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`CardHeader` renders `hgroup.ui-header`, the header region class `Dialog` and `Drawer` use, and `card.css` styles `.ui-header` like the `hgroup`.",
  notes: {
    card: [
      {
        ...components(
          `<a href="#header"><code>CardHeader</code></a> renders <code>hgroup.ui-header</code>.`,
        ),
        html: `The <a href="#header">header</a> takes <code>.ui-header</code> on its <code>hgroup</code>, like the <code>Drawer</code> header.`,
      },
      {
        ...components(
          `<a href="#semantics"><code>as="article"</code></a> or <code>as="section"</code> renders the card as that element, and <code>CardHeader as="header"</code> renders a header row.`,
        ),
        html: `The card classes work on an <a href="#semantics"><code>article</code></a> or a <code>section</code>, and <code>.ui-header</code> on a <code>header</code>.`,
      },
    ],
  },
} satisfies Change
