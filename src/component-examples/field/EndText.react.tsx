import { Field } from "opui-css/react"

export default function EndText() {
  return (
    <Field
      endText="We never share your email."
      htmlFor="field-end-text-1"
      label="Email"
    >
      <input
        aria-describedby="field-end-text-1-end-text"
        id="field-end-text-1"
        placeholder="name@example.com"
        type="email"
      />
    </Field>
  )
}
