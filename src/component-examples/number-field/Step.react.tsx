import { Field, StepButton } from "opui-css/react"

export default function Step() {
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" htmlFor="number-field-step-1" />}
      htmlFor="number-field-step-1"
      label="Opacity"
      start={<StepButton command="--step-down" htmlFor="number-field-step-1" />}
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
