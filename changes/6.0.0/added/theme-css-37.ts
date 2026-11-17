import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds optional `--ui-card-padding`, the padding of `Card`, `Dialog`, `Drawer` and `Accordion` content, headers, footers and actions and of `Checkbox`, `Radio` and `Switch` cards, and `--ui-list-item-padding-inline`, the horizontal padding of `List` and `Menu` items and `Select` options (`--ui-space-3` when unset).",
} satisfies Change
