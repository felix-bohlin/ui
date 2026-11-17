import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` directly in an `Accordion`, `Card` or `Dialog` draw the focus ring inside, so the surface doesn't clip it. A ring inside the selected tab is `SelectedItemText` in forced colors, so it shows on the `SelectedItem` fill.",
} satisfies Change
