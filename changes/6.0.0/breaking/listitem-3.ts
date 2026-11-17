import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ListItem` `type` is `choice` (`checkbox`, `radio` or `switch`), and it can\'t be combined with `as` or `href` (types). An item with `as="button"` takes the native button `type` instead.',
  migrating: ["list"],
} satisfies Change
