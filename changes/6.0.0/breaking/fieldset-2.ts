import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`FieldSet` is `Fieldset` (`components/Fieldset/Fieldset.*`), and `FieldDescription` renders `.ui-description` instead of `.ui-field-description`.",
  migrating: ["field-group-and-fieldset"],
  notes: {
    form: {
      ...slots(
        `<code>FieldSet</code> is <a href="#fieldset"><code>Fieldset</code></a>, and <code>FieldDescription</code> renders <code>.ui-description</code> instead of <code>.ui-field-description</code>.`,
      ),
      html: `the <a href="#fieldset">fieldset</a> description is <code>.ui-description</code> instead of <code>.ui-field-description</code>.`,
    },
  },
} satisfies Change
