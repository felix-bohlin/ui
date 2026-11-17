import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ButtonGroup` is `ControlGroup` (`components/ControlGroup/ControlGroup.*`), `.ui-button-group` is `.ui-control-group`, and `button-group.css` is `control-group.css`. The buttons keep their own borders and the group joins their edges, so it joins a `TextField`, `Select` or `NumberField` too, and a `Textarea` in a vertical group. Variants apply to the whole group: a variant class on a single button inside a group is no longer supported. The group no longer overflows its container: it wraps onto more rows, and `overflow` keeps it on one row instead. The root no longer needs `role="group"` to be styled, though the components still render it, and a passed `role` replaces it in every framework.',
  migrating: ["control-group"],
  notes: {
    "control-group": {
      ...slots(
        `<code>ButtonGroup</code> is <a href="#fields"><code>ControlGroup</code></a>. It joins fields as well as buttons, and wraps onto more rows when it doesn't fit.`,
      ),
      html: `<code>.ui-button-group</code> is <a href="#fields"><code>.ui-control-group</code></a>, and <code>button-group.css</code> is <code>control-group.css</code>. It joins fields as well as buttons, and wraps onto more rows when it doesn't fit.`,
    },
  },
} satisfies Change
