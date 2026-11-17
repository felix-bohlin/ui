import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ToggleGroup` `size="default"` is `size="medium"`, the name of its default look.',
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: slots(
      `<a href="#sizes"><code>size="default"</code></a> is <code>size="medium"</code> on <code>ToggleGroup</code>, like every sized component.`,
    ),
  },
} satisfies Change
