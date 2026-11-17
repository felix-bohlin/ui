import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button` and `Chip` links with `disabled` (`aria-disabled="true"`) no longer render `href`, so they can\'t be focused or followed. They render `role="link"` instead, so a screen reader still hears a disabled link and its `aria-label`. The CSS doesn\'t block clicks on them, so remove `href` from them in HTML.',
  migrating: ["button", "chip"],
} satisfies Change
