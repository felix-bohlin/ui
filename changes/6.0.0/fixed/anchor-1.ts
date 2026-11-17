import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Anchor` with `trigger="hover"` and `Tooltip` stay visible on a scrolled page in Chrome 141. `normalize.css` gives `html` `min-block-size: 100%` instead of `block-size: 100%`, and `body` `min-block-size: 100svb` instead of `100%`, because `position-visibility: anchors-visible` hid every popover whose trigger was below the first screen.',
} satisfies Change
