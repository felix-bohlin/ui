import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` and `Select` keep the control height of buttons in Firefox and Safari. Single-line inputs and selects get a definite height, `1lh` plus their padding, so the engine's own input height and padding rounding no longer make the field up to 2px taller.",
} satisfies Change
