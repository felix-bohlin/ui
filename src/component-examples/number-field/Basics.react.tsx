import { Field, StepButton } from "opui-css/react"

export default function Basics() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" htmlFor="number-field-basics-1" />}
      htmlFor="number-field-basics-1"
      label="Quantity"
      start={
        <StepButton command="--step-down" htmlFor="number-field-basics-1" />
      }
    >
      <input
        id="number-field-basics-1"
        max="10"
        min="1"
        type="number"
        defaultValue="1"
      />
    </Field>
  )
}
