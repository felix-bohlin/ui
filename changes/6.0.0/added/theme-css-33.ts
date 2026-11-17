import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-chip-radius`, `--ui-dialog-radius` and `--ui-menu-radius`, the corner radius of `Chip`, `Dialog` and `Menu` (`--ui-radius` when unset). `--ui-menu-radius` also rounds the `Select` picker, which follows `--ui-field-radius` when it's unset.",
} satisfies Change
