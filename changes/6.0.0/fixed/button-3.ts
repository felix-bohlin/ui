import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button`, `Checkbox`, `ControlGroup`, `Radio`, `Switch` and `ToggleButton` style `aria-disabled="true"` like `disabled`, on a link or a focusable button (`<a class="ui-button" aria-disabled="true">`) or on the input: dimmed, with a `not-allowed` cursor, and buttons and toggle buttons get no hover or press styles. In forced colors a `Button` or `Chip` with `aria-disabled="true"` gets `GrayText`, like a native disabled button. The browser doesn\'t block the change of an input, so a script has to.',
  notes: {
    button: `Links with <code>aria-disabled="true"</code> <a href="#disabled">look and act disabled</a>.`,
  },
} satisfies Change
