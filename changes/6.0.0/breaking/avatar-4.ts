import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Avatar` no longer takes `isGroup`. Wrap avatars in `AvatarGroup`, which renders `div.ui-avatar-group` with `role="group"` and overlaps the avatars by `--ui-space-2` (8px) instead of 16px.',
  migrating: ["avatar"],
} satisfies Change
