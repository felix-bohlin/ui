import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ControlGroup` and `ToggleGroup` take `overflow`: `"wrap"`, the default, wraps their items onto more rows, `"scroll"` (`.ui-overflow-scroll`) keeps them on one row, each on one line, and scrolls sideways, and `"shrink"` (`.ui-overflow-shrink`) keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.',
  notes: {
    "control-group": {
      default: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>overflow="scroll"</code> or truncates with <code>overflow="shrink"</code>.`,
      html: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>.ui-overflow-scroll</code> or truncates with <code>.ui-overflow-shrink</code>.`,
    },
    toggle: {
      default: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>overflow="scroll"</code> or truncates with <code>overflow="shrink"</code>.`,
      html: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>.ui-overflow-scroll</code> or truncates with <code>.ui-overflow-shrink</code>.`,
    },
  },
} satisfies Change
