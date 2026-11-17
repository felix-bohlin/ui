import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` grows from `--ui-button-size` with its content instead of having a fixed height.",
  notes: {
    toggle: `A <a href="#toggle-button">toggle button</a> grows with its content from <code>--ui-button-size</code> instead of having a fixed height.`,
  },
} satisfies Change
