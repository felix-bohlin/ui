import { Field } from "opui-css/react"

export default function Validation() {
  return (
    <Field
      endText="Set it to 20 or more to hear alarms."
      htmlFor="range-validation-1"
      label="Alarm volume"
    >
      <input
        aria-describedby="range-validation-1-end-text"
        aria-invalid="true"
        id="range-validation-1"
        type="range"
        defaultValue="10"
      />
    </Field>
  )
}
