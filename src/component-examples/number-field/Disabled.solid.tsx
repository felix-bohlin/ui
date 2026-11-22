/** @jsxImportSource @solidjs/web */
import { Field, StepButton } from "opui-css/solid"

export default function Disabled() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for="number-field-disabled-1" />}
      for="number-field-disabled-1"
      label="Quantity"
      start={<StepButton command="--step-down" for="number-field-disabled-1" />}
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
