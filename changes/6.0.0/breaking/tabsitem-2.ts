import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TabsItem` takes `id` instead of `tabId`, and `TabsLabel` takes `for` (`htmlFor` in React) instead of `tabId`, the native names of the attributes they set. The item still generates the id and passes it to its label when both are omitted.",
  migrating: ["tabs"],
  notes: {
    tabs: slots(
      `<code>TabsItem</code> <code>tabId</code> is <a href="#api"><code>id</code></a>, and <code>TabsLabel</code> <code>tabId</code> is <code>for</code>, the native names.`,
    ),
  },
} satisfies Change
