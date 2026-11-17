import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` disabled state uses `--ui-disabled-opacity` like `Button`, and `--ui-text-disabled` when unchecked (a checked one keeps its selected text color), its hover is `--ui-text-strong` at `--ui-state-hover-alpha-light` and `--ui-state-hover-alpha-dark` instead of black and white, so it follows a theme's grays, and `ToggleButton` and `ToggleGroup` read `--ui-button-size*` instead of `--ui-field-size*`.",
  notes: {
    toggle: `A disabled <a href="#disabled">toggle</a> dims like a disabled button, and hover tints with <code>--ui-text-strong</code> at the button hover strength, so it follows a theme's grays.`,
  },
} satisfies Change
