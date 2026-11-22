/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Disabled() {
  return (
    <Field for="range-disabled-1" label="Microphone">
      <input disabled id="range-disabled-1" type="range" />
    </Field>
  )
}
