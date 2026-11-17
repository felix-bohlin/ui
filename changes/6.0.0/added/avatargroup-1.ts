import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`AvatarGroup` component (`div.ui-avatar-group[role=\"group\"]`) in Astro, React, Svelte and Vue. It takes `class`, an `aria-label` or `aria-labelledby` that its types require in Astro, React and Svelte, a `role` that replaces `group`, other attributes, and avatars as children. The avatars overlap by `--ui-space-2` from the start, so the initials stay whole at every size and the group's box ends at its last avatar, a focused avatar is raised so the next one doesn't cover its focus ring, and a `Badge` on an avatar sits on its start side, the part the next avatar doesn't cover, with the same ring as the avatars (`--_outline-color`).",
  notes: {
    avatar: [
      components(
        `<a href="#grouped"><code>AvatarGroup</code></a> requires <code>aria-label</code> or <code>aria-labelledby</code> in its types.`,
      ),
      `<a href="#grouped">Grouped</a> avatars overlap by <code>--ui-space-2</code>, so the initials stay whole.`,
    ],
  },
} satisfies Change
