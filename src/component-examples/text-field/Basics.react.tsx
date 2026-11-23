import { Field } from "opui-css/react"

export default function Basics() {
  return (
    <Field htmlFor="text-field-basics-1" label="Email">
      <input
        autoComplete="email"
        id="text-field-basics-1"
        name="email"
        type="email"
      />
    </Field>
  )
}
