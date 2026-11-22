/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="text-field-basics-1" label="Email">
      <input
        autocomplete="email"
        id="text-field-basics-1"
        name="email"
        type="email"
      />
    </Field>
  )
}
