import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` adds shape roles. `--ui-radius-round` is the pill radius, `--ui-radius-small` (`--ui-radius` capped at 5px) rounds `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and rounded avatars, `--ui-radius-x-small` (capped at 2px) the checkbox box, and `--ui-border-width-thick` draws the table head and foot rules, the blockquote bar, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule and the `Tabs` indicator. No component reads an Open Props radius or border size any more.",
} satisfies Change
