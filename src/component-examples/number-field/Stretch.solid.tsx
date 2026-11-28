/** @jsxImportSource @solidjs/web */
import { Field, StepButton } from "opui-css/solid"

export default function Stretch() {
  return (
    <Field
      end={<StepButton command="--step-up" for="number-field-stretch-1" />}
      for="number-field-stretch-1"
      label="Quantity"
      start={<StepButton command="--step-down" for="number-field-stretch-1" />}
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
