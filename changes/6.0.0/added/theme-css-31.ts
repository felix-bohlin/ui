import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-button-padding-inline`, `--ui-button-padding-inline-x-small`, `--ui-button-padding-inline-small` and `--ui-button-padding-inline-large`, the horizontal padding of `Button` per size (`1.5ex`, `1ex`, `1.25ex` and `2.5ex` when unset).",
} satisfies Change
