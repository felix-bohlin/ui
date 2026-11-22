import { Field } from "opui-css/react"

export default function Disabled() {
  return (
    <Field htmlFor="range-disabled-1" label="Microphone">
      <input disabled id="range-disabled-1" type="range" />
    </Field>
  )
}
