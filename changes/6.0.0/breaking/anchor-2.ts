import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Anchor`, `Badge` and `Tooltip` floating content is `.ui-floating` instead of `.ui-anchor-floating`.",
  migrating: ["anchor", "badge", "tooltip"],
  notes: {
    anchor: {
      ...slots(
        `the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
    },
    tooltip: {
      ...slots(
        `the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
    },
  },
} satisfies Change
