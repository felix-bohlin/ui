import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Fieldset` (`.ui-fieldset`) no longer reads `data-invalid`. Its end text turns red when a control inside has `aria-invalid="true"` or is `:user-invalid`, so mark each control in the group (`error` on each `Checkbox`, `Radio` or `Switch` in Astro and Vue).',
  migrating: ["field-group-and-fieldset"],
  notes: {
    form: {
      ...slots(
        `set <code>error</code> on each field instead of <code>data-invalid</code> on the <code>Fieldset</code> (<a href="#fieldset-invalid">Invalid</a>).`,
      ),
      html: `an invalid <code>.ui-fieldset</code> takes <code>aria-invalid="true"</code> on each control instead of <code>data-invalid</code> on the fieldset (<a href="#fieldset-invalid">Invalid</a>).`,
    },
  },
} satisfies Change
