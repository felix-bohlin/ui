import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`FieldGroup` no longer sets `role="group"`. Wrap it in a `Fieldset` (a `<fieldset>`, already a group) to group and name the fields. `Fieldset` with another element in `as` gets `role="group"`.',
  migrating: ["field-group-and-fieldset"],
} satisfies Change
