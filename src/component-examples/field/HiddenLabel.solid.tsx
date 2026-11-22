/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function HiddenLabel() {
  return (
    <Field for="field-hidden-label-1" hideLabel label="Search">
      <input id="field-hidden-label-1" placeholder="Search" type="search" />
    </Field>
  )
}
