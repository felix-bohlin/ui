/** @jsxImportSource @solidjs/web */
import { Field, StepButton } from "opui-css/solid"

export default function Basics() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for="number-field-basics-1" />}
      for="number-field-basics-1"
      label="Quantity"
      start={<StepButton command="--step-down" for="number-field-basics-1" />}
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
