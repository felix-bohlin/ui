import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Range` updates its value `<output>` after its form is reset, in every browser, and leaves it when a `reset` listener cancels the reset. In Vue the bound value follows the reset, so custom readout content does too.",
} satisfies Change
