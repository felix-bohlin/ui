import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Avatar` requires `alt` when `src` is set (types). `alt=""` is still allowed for decorative images.',
  migrating: ["avatar"],
  notes: {
    avatar: slots(
      `<a href="#image"><code>alt</code></a> is required when <code>src</code> is set.`,
    ),
  },
} satisfies Change
