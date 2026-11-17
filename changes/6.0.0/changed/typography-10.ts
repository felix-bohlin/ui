import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Typography` styles `.ui-overline`, `.ui-hgroup` and rich text `hgroup`, and `.ui-code-block` and rich text `pre`, with one rule per pair in `@scope (…) to (.ui-not-rich-text)` blocks, and `link.css` styles `.ui-link` and rich text links the same way, so the class and the classless version can't drift. Rich text links need `link.css` next to `typography.css`.",
  notes: {
    typography: `<a href="#link">Rich text links</a> are styled by <code>link.css</code>, with one rule for <code>.ui-link</code> and classless links. Install it next to <code>typography.css</code>.`,
  },
} satisfies Change
