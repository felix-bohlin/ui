/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="range-basics-1" label="Volume">
      <input id="range-basics-1" type="range" />
    </Field>
  )
}
