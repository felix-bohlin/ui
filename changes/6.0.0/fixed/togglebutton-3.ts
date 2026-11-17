import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`ToggleButton` declares `--_selected-bg-color` on the root with its other inputs, so an override on `.ui-toggle-button` reaches the checked button instead of losing to the checked rule.",
} satisfies Change
