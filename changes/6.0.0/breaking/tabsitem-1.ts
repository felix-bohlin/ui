import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TabsItem` `open` and `ToggleButton` `pressed` are `checked`, the native attribute they set.",
  migrating: ["tabs"],
  notes: {
    tabs: slots(
      `<code>TabsItem</code> <code>open</code> is <a href="#basics"><code>checked</code></a>.`,
    ),
  },
} satisfies Change
