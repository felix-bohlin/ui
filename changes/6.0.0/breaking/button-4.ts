import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button`, and `Chip` and `Avatar` with `as="button"`, render `type="button"` by default in Astro and Vue, so they no longer submit forms. Pass `type="submit"` for submit buttons.',
  migrating: ["avatar", "button", "chip"],
  notes: {
    avatar: slots(
      `<code>as="button"</code> renders <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    ),
    button: slots(
      `buttons render <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    ),
    chip: slots(
      `<a href="#button"><code>as="button"</code></a> renders <code>type="button"</code> by default.`,
    ),
  },
} satisfies Change
