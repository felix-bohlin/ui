import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Callout`, `Card`, `Chip`, `Link`, `List`, `Select`, `Table`, `TextField`, `Textarea`, `ToggleButton` and `ToggleGroup` fade their hover, pressed and selected colors, like `Button`: callout and rich text links, the border of a clickable card, button and link chips, filled fields and toggle buttons over `--_duration`. List and table rows and select options change at once on hover and fade back over `--ui-duration-fast` (`--_item-duration`, `--_row-duration`), so the highlight never lags behind the pointer. Every fade follows `--_motion`, and `Table` reads `--_motion`, `--_duration` and `--_ease` on its root.",
  notes: {
    list: `<a href="#clickable-list-item">Clickable rows</a> and <a href="#selected">selected rows</a> fade, and a hovered row changes at once and fades back over <code>--ui-duration-fast</code>, so the highlight trails the pointer.`,
    select: `<a href="#variants">Filled selects</a> fade their hover background, and options highlight at once on hover and fade back over <code>--ui-duration-fast</code>.`,
    table: `<a href="#density">Rows</a> highlight at once on hover and fade back over <code>--ui-duration-fast</code>.`,
  },
} satisfies Change
