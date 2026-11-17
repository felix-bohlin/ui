import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Checkbox`, `Radio` and `Switch` take `orientation="vertical"` (`.ui-vertical`) instead of `stack` (`.ui-stack`) to put the label under the control, like the other components with a layout axis.',
  migrating: ["checkbox", "radio", "switch"],
  notes: {
    checkbox: {
      ...slots(
        `<a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `<a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
    radio: {
      ...slots(
        `<a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `<a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
    switch: {
      ...slots(
        `<a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `<a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
  },
} satisfies Change
