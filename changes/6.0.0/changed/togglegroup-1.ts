import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleGroup` is in the `components.extended` layer, like `ControlGroup`.",
  notes: {
    toggle: `<code>ToggleGroup</code> styles sit in the <code>components.extended</code> layer, like <code>ControlGroup</code> (<a href="#toggle-group">Toggle group</a>).`,
  },
} satisfies Change
