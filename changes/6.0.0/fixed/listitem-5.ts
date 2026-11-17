import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ListItem` with `as="button" disabled` (or `aria-disabled="true"` on a link) looks disabled in a plain `List` too: dimmed, `not-allowed` cursor, no hover tint.',
} satisfies Change
