import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ToggleGroup` `selection` is `multiple`. A group is single-select by default, so add `multiple` to a group that left `selection` out or set `selection="multiple"`, and drop `selection="single"`.',
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: slots(
      `<code>ToggleGroup</code> <code>selection</code> is <a href="#multi-select"><code>multiple</code></a>, and a group is <a href="#single-select">single-select</a> by default.`,
    ),
  },
} satisfies Change
