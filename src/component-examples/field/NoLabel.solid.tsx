/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function NoLabel() {
  return (
    <Field for="field-no-label-1">
      <input aria-label="Search" id="field-no-label-1" placeholder="Search" />
    </Field>
  )
}
