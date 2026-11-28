import { Field } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <Field hideLabel htmlFor="field-hidden-label-1" label="Search">
      <input id="field-hidden-label-1" placeholder="Search" type="search" />
    </Field>
  )
}
