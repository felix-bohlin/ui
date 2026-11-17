import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds `--ui-selected-strong` and `--ui-on-selected-strong`, the mark of a selected item that has to stand out from the page on its own (3:1): the current `Carousel` marker, the bar on selected `List` rows and the selected tab of filled `Tabs`. They default to `--ui-primary` and `--ui-on-primary`. `--ui-selected` stays the fill behind a selected item.",
} satisfies Change
