import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Anchor` and `Tooltip` `alignment` is `positionArea`, named after the CSS `position-area` value it takes, and `.ui-with-arrow` on a tooltip is `.ui-arrow`, like the `arrow` prop.",
  migrating: ["anchor", "tooltip"],
  notes: {
    anchor: slots(
      `<code>alignment</code> is <a href="#always-visible"><code>positionArea</code></a>.`,
    ),
    tooltip: {
      ...slots(
        `<code>alignment</code> is <a href="#position"><code>positionArea</code></a>.`,
      ),
      html: `<code>.ui-with-arrow</code> is <a href="#arrow"><code>.ui-arrow</code></a>.`,
    },
  },
} satisfies Change
