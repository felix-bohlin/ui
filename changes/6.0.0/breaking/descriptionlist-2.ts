import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`DescriptionList` takes `border` (`"solid"` or `"dotted"`) for the style of the line between a term and its description, and draws none without it: `bordered` is `border="solid"` and `bordered="dotted"` is `border="dotted"` in Astro and Vue. The classes are `.ui-border-solid` and `.ui-border-dotted`: in HTML, replace the 5.4.3 classes `.ui-bordered` with `.ui-border-solid` and `.ui-bordered.ui-dotted` with `.ui-border-dotted`. `.ui-dotted` is gone, and `.ui-bordered` stays on `List` and `Menu`.',
  migrating: ["description-list"],
  notes: {
    "description-list": {
      ...slots(
        `<a href="#border"><code>border</code></a> picks the line: replace <code>bordered</code> with <code>border="solid"</code> and <code>bordered="dotted"</code> with <code>border="dotted"</code>.`,
      ),
      html: `<a href="#border"><code>.ui-border-solid</code></a> replaces <code>.ui-bordered</code>, and <code>.ui-border-dotted</code> replaces <code>.ui-bordered.ui-dotted</code>.`,
    },
  },
} satisfies Change
