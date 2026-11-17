import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` regions are `.ui-header`, `.ui-content` and `.ui-footer`, like `Drawer`. The header is a `div.ui-header` row instead of an `hgroup`, and `aria-labelledby` points at the title heading inside it. `.ui-footer` replaces `.ui-actions` at the end of the dialog, and `.ui-align-end` on it is the default and can go. The title heading is `--ui-font-size-h4` through `--_title-font-size`, so it needs no `.ui-h4`.",
  migrating: ["dialog"],
} satisfies Change
