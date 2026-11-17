import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` no longer supports `.ui-disabled`, and Astro and Vue no longer add it. Set `disabled` on the input, the toggle is styled through `:has(input:disabled)`.",
  migrating: ["toggle-button-and-toggle-group"],
  notes: {
    toggle: `no <code>.ui-disabled</code>. A <a href="#toggle-button">toggle</a> looks disabled when its input is <code>disabled</code>.`,
  },
} satisfies Change
