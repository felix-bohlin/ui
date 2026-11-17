import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Anchor` and `Tooltip` default to `self-` `position-area` keywords (`self-start self-end` and `self-block-start`), so floating content follows its own writing direction and mirrors in a right-to-left part of a left-to-right page. Before, it followed the page's direction while its margins followed its own.",
} satisfies Change
