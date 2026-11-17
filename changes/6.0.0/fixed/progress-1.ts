import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Progress` pulses in place under reduced motion (`--ui-motion: 0`, or `--_motion: 0` on the bar) instead of freezing. Its indeterminate animation was scaled to `0s`.",
} satisfies Change
