import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`theme.css` named colors use the Open Props hue angles: `--ui-blue` is `240`, `--ui-green` `145`, `--ui-orange` `75` and `--ui-red` `25`, like the severity scopes. `--ui-info` and `--ui-blue` use `240`, the same blue as the `.ui-info` palette. White text on an info `Badge` is 4.58:1.",
} satisfies Change
