/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Numeric() {
  return (
    <Field for="text-field-numeric-1" label="Verification code">
      <input
        id="text-field-numeric-1"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="123456"
      />
    </Field>
  )
}
