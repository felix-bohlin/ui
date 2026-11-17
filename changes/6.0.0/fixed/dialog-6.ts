import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Dialog` and `Drawer` open without a focus ring around them. Safari focuses the `dialog` itself when nothing inside it is in the Tab order, and `normalize.css` drew its focus ring there. The ring stays on the controls inside, and the rule no longer needs `!important`.",
} satisfies Change
