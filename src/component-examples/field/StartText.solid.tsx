/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function StartText() {
  return (
    <Field
      for="field-start-text-1"
      label="Name"
      startText="As it appears on your ID"
    >
      <input
        aria-describedby="field-start-text-1-start-text"
        id="field-start-text-1"
      />
    </Field>
  )
}
