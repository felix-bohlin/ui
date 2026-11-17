import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ListItem` `as` only accepts `"a"` or `"button"` (types). A static item leaves `as` out and renders its content straight in the `<li>`.',
  migrating: ["list"],
  notes: {
    list: slots(
      `<a href="#list-item-api"><code>ListItem</code> <code>as</code></a> only accepts <code>"a"</code> or <code>"button"</code>. A static item leaves it out.`,
    ),
  },
} satisfies Change
