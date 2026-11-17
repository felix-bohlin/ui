import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` and `ToggleGroup` take a `large` size (`.ui-large`), and `ControlGroup` takes `x-small` (`.ui-x-small`).",
  notes: {
    toggle: {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>.`,
    },
  },
} satisfies Change
