import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tooltip` requires an `id` (types). Without it the trigger can't reference the tooltip.",
  migrating: ["tooltip"],
  notes: {
    tooltip: [
      slots(`<a href="#api"><code>id</code></a> is required.`),
      slots(
        `no <code>&lt;span interestfor&gt;</code> around the trigger. Put <code>interestfor</code> with the tooltip <code>id</code> on the <a href="#basics">trigger</a>.`,
      ),
    ],
  },
} satisfies Change
