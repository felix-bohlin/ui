import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog`, `Drawer` and the `Select` picker take `--ui-shadow-overlay`, the shape of Open Props `--shadow-3`, like `Menu`, instead of the raised card shadow (`Dialog`) or `--shadow-2` (`Drawer` and the picker).",
  notes: {
    dialog: `The dialog shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, like Drawer and Menu.`,
    drawer: `The drawer shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus and select pickers. Padding reads the <code>--ui-space-*</code> scale.`,
  },
} satisfies Change
