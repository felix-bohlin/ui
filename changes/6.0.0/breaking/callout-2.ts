import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Callout` in Astro and Vue takes parts instead of slots: `CalloutIcon` renders the severity icon and `CalloutContent` the content. The root no longer renders an icon or wraps its children in `.ui-content`. The `title` slot (a fixed `h3`) is gone: write the title as a plain heading of any level first in `CalloutContent`. A custom icon is an `svg` placed first in `Callout`.",
  migrating: ["callout"],
  notes: {
    callout: slots(
      `<a href="#icon"><code>CalloutIcon</code></a> and <a href="#variants"><code>CalloutContent</code></a> replace the automatic icon, the content wrapper and the slots. Write the title as a plain heading in <code>CalloutContent</code> instead of the <code>title</code> slot.`,
    ),
  },
} satisfies Change
