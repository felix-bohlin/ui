import { Field, StepButton } from "opui-css/react"

export default function Disabled() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" htmlFor="number-field-disabled-1" />}
      htmlFor="number-field-disabled-1"
      label="Quantity"
      start={
        <StepButton command="--step-down" htmlFor="number-field-disabled-1" />
      }
    >
      <input
        disabled
        id="number-field-disabled-1"
        type="number"
        defaultValue="1"
      />
    </Field>
  )
}
