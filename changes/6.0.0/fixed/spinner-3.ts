import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Spinner` no longer makes a busy element `position: relative`, which moved a busy `Drawer` and the absolutely positioned descendants of a busy section, form or row.",
} satisfies Change
