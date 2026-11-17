import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Anchor` with `trigger="hover"` and `Tooltip` no longer wrap their trigger in a `<span interestfor>`. Add `interestfor` with the anchor\'s `id` to the trigger element. `trigger` only takes `"hover"`: leave it out instead of `trigger="always"`.',
  migrating: ["anchor"],
  notes: {
    anchor: [
      slots(
        `<a href="#hover-trigger"><code>trigger</code></a> only takes <code>"hover"</code>. Leave it out instead of <code>trigger="always"</code>.`,
      ),
      slots(
        `<a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
      ),
    ],
  },
} satisfies Change
