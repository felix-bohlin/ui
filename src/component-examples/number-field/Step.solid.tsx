/** @jsxImportSource @solidjs/web */
import { Field, StepButton } from "opui-css/solid"

export default function Step() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for="number-field-step-1" />}
      for="number-field-step-1"
      label="Opacity"
      start={<StepButton command="--step-down" for="number-field-step-1" />}
    >
      <input
        id="number-field-step-1"
        max="1"
        min="0"
        step="0.1"
        type="number"
        defaultValue="0.5"
      />
    </Field>
  )
}
