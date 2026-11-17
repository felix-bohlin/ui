import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Table` takes `stickyHeader` (`.ui-sticky-header`), which keeps the header rows at the top of the nearest scroll container and shows a shadow once they are stuck (scroll-state container queries). Offset it with `--_sticky-inset`.",
  notes: {
    table: {
      default: `<a href="#sticky-header">Sticky header</a> with the <code>stickyHeader</code> prop.`,
      html: `<a href="#sticky-header">Sticky header</a> with <code>.ui-sticky-header</code>.`,
    },
  },
} satisfies Change
