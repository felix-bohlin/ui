import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Divider` takes content in the middle of the line, text or any element, through the default slot (a `<div>` instead of the `<hr>`), or in HTML as a `<div class="ui-divider">` or `<p class="ui-divider">`. `align` (`.ui-align-start`, `.ui-align-end`) moves it to one side, and the lines follow the variant. In a `Form`, a button row after a labeled divider drops its top margin, like after an `hr`.',
  notes: {
    divider: {
      ...slots(
        `<a href="#content">Content</a> in the middle of the line through the default slot, aligned with <code>align</code>.`,
      ),
      default: `<a href="#content">Content</a> in the middle of the line as children, aligned with <code>align</code>.`,
      html: `<a href="#content">Content</a> in the middle of the line in a <code>div.ui-divider</code>, aligned with <code>.ui-align-start</code> or <code>.ui-align-end</code>.`,
    },
  },
} satisfies Change
