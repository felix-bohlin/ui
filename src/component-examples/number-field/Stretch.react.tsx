import { Field, StepButton } from "opui-css/react"

export default function Stretch() {
  return (
    <Field
      end={<StepButton command="--step-up" htmlFor="number-field-stretch-1" />}
      htmlFor="number-field-stretch-1"
      label="Quantity"
      start={
        <StepButton command="--step-down" htmlFor="number-field-stretch-1" />
      }
    >
      <input
        id="number-field-stretch-1"
        max="10"
        min="1"
        type="number"
        defaultValue="1"
      />
    </Field>
  )
}
