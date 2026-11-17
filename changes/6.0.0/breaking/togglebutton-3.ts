import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` `value` no longer falls back to `label`. Pass `value` when the input needs one, such as in a form or a `ToggleGroup`.",
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: slots(
      `<code>ToggleButton</code> <a href="#api"><code>value</code></a> no longer falls back to <code>label</code>.`,
    ),
  },
} satisfies Change
