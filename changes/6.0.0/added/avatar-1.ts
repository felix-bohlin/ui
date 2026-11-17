import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Avatar` and `ListItem` links take `disabled`, like `Button` and `Chip`: the link drops its `href` and gets `role="link"` and `aria-disabled="true"`, so a screen reader still hears a disabled link.',
  notes: {
    avatar: components(
      `A link avatar takes <a href="#disabled"><code>disabled</code></a>: it drops its <code>href</code> and gets <code>role="link"</code> and <code>aria-disabled="true"</code>.`,
    ),
    list: components(
      `A link <a href="#api"><code>ListItem</code></a> takes <code>disabled</code>: it drops its <code>href</code> and gets <code>role="link"</code> and <code>aria-disabled="true"</code>.`,
    ),
  },
} satisfies Change
