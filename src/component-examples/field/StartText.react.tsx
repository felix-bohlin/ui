import { Field } from "opui-css/react"

export default function StartText() {
  return (
    <Field
      htmlFor="field-start-text-1"
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
