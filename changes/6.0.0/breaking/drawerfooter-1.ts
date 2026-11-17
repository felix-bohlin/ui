import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`DrawerFooter` takes `align`, like `DialogFooter`. Its content sits at the end on every side, and `align="start"` (`.ui-align-start`) moves it to the start, instead of starting in an `inline-end` drawer.',
  migrating: ["drawer"],
} satisfies Change
