import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ControlGroup` item styles select its direct child `.ui-button`s instead of every `button`, so `Button` links (`<a class="ui-button">`) are styled like the buttons and a `Menu` inside the group (split button) keeps its own item styles. A plain `<button>` without `.ui-button` gets no group item styles, so add `.ui-button` to it.',
  migrating: ["control-group"],
  notes: {
    "control-group": {
      ...slots(
        `the group styles its direct child <code>.ui-button</code>s instead of every <code>button</code>. Add <code>.ui-button</code> to a plain <code>&lt;button&gt;</code> in a group (<a href="#variants">Variants</a>).`,
      ),
      html: `the group styles its direct child <code>.ui-button</code>s instead of every <code>button</code>. Add <code>.ui-button</code> to a plain <code>&lt;button&gt;</code> in a group (<a href="#variants">Variants</a>).`,
    },
  },
} satisfies Change
