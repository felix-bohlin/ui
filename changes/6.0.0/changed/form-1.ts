import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Form`, `Fieldset` and `FieldLegend` type `as` in Vue as `"div" | "form"`, `"div" | "fieldset"` and `"legend" | "p"`.',
  notes: {
    form: {
      vue: `<code>Form</code>, <code>Fieldset</code> and <code>FieldLegend</code> type <a href="#without-fieldset"><code>as</code></a> as <code>"div" | "form"</code>, <code>"div" | "fieldset"</code> and <code>"legend" | "p"</code>.`,
    },
  },
} satisfies Change
