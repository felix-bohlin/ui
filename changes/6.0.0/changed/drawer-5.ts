import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` footer spaces its items and the buttons in its `.ui-actions` by `--ui-space-2`, like `Dialog`, instead of `--ui-space-3`. `card.css` declares `--_footer-gap` for both, so setting it changes either.",
  notes: {
    drawer: `The <a href="#basics">footer</a> spaces its items and buttons by <code>--ui-space-2</code>, like Dialog.`,
  },
} satisfies Change
