import { Field } from "opui-css/react"

export default function Numeric() {
  return (
    <Field htmlFor="text-field-numeric-1" label="Card number">
      <input
        autoComplete="cc-number"
        id="text-field-numeric-1"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </Field>
  )
}
