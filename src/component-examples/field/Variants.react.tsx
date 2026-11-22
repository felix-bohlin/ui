import { Field } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Field htmlFor="field-variants-1" label="Outlined">
        <input id="field-variants-1" placeholder="Your name" />
      </Field>
      <Field htmlFor="field-variants-2" label="Filled" variant="filled">
        <input id="field-variants-2" placeholder="Your name" />
      </Field>
    </>
  )
}
