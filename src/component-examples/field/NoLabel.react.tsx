import { Field } from "opui-css/react"

export default function NoLabel() {
  return (
    <Field htmlFor="field-no-label-1">
      <input aria-label="Search" id="field-no-label-1" placeholder="Search" />
    </Field>
  )
}
