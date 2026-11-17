import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`FieldGroup` `direction` (`"row"`, `"column"`) is `orientation` (`"auto"`, `"horizontal"`, `"vertical"`), like `ControlGroup`, `ToggleGroup` and `Carousel`, and `.ui-row` and `.ui-column` are `.ui-horizontal` and `.ui-vertical`. `auto`, the default, stacks fields and lines up a group of only buttons in a row, and `vertical` stacks the buttons too.',
  migrating: ["field-group-and-fieldset"],
  notes: {
    form: {
      ...slots(
        `<a href="#field-group-horizontal"><code>FieldGroup</code></a> <code>direction</code> is <code>orientation</code> (<code>"auto"</code>, the default, <code>"horizontal"</code>, <code>"vertical"</code>), like <code>ControlGroup</code>.`,
      ),
      html: `<a href="#field-group-horizontal"><code>.ui-row</code> and <code>.ui-column</code></a> on a field group are <code>.ui-horizontal</code> and <code>.ui-vertical</code>.`,
    },
  },
} satisfies Change
