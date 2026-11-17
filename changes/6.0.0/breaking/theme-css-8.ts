import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` roles are what components read, so overriding a palette step (`--ui-gray-N`, `--ui-color-N`) or an Open Props value such as `--size-3` on a part of the page no longer changes the components there. Override the role instead, such as `--ui-surface`, `--ui-border-color` or `--ui-space-3`, or put `.ui-palette` on the part so the roles are derived again from its palette. A subtree that should follow its own knobs takes `.ui-palette`.",
} satisfies Change
