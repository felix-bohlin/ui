import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`CardHeader` takes `as="div"` and `as="header"`. A `div.ui-header` or `header.ui-header` with an `hgroup` inside is a row: the `hgroup` takes the free space, so an avatar before it and a chip or buttons after it line up on one row.',
  notes: {
    card: {
      ...components(
        `<a href="#header-row"><code>CardHeader as="div"</code></a> with an <code>hgroup</code> inside is a row for an avatar, the heading and buttons.`,
      ),
      html: `A <a href="#header-row"><code>div.ui-header</code></a> with an <code>hgroup</code> inside is a row for an avatar, the heading and buttons.`,
    },
  },
} satisfies Change
