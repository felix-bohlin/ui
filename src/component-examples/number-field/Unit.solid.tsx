/** @jsxImportSource @solidjs/web */
import { Field, StepButton } from "opui-css/solid"

export default function Unit() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for="number-field-unit-1" />}
      endText="kg"
      for="number-field-unit-1"
      label="Weight"
      start={<StepButton command="--step-down" for="number-field-unit-1" />}
    >
      <input
        aria-describedby="number-field-unit-1-end-text"
        id="number-field-unit-1"
        max="30"
        min="0.5"
        step="0.5"
        type="number"
        defaultValue="2.5"
      />
    </Field>
  )
}
