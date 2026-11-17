import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` control and chip sizes are in `rem` (`1.75rem`, `2rem`, `2.5rem` and `3rem`, and `1.5rem` for the x-small chip) instead of `px`, like the choice, switch and icon sizes, so the whole size scale follows the root font size. At the default 16px the sizes are the same, except `--ui-control-size-large`, which is 48px instead of 46px, so large buttons, fields, toggles and selects grow by 2px.",
} satisfies Change
