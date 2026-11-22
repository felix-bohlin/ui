import { Field, StepButton } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <Field
        autoFit
        end={
          <StepButton command="--step-up" htmlFor="number-field-validation-1" />
        }
        htmlFor="number-field-validation-1"
        label="Bandmates"
        start={
          <StepButton
            command="--step-down"
            htmlFor="number-field-validation-1"
          />
        }
      >
        <input id="number-field-validation-1" min="1" required type="number" />
      </Field>
      <Field
        autoFit
        end={
          <StepButton command="--step-up" htmlFor="number-field-validation-2" />
        }
        endText="Only 4 sets of flatwounds left, whoops."
        htmlFor="number-field-validation-2"
        label="Quantity"
        start={
          <StepButton
            command="--step-down"
            htmlFor="number-field-validation-2"
          />
        }
      >
        <input
          aria-describedby="number-field-validation-2-end-text"
          aria-invalid="true"
          id="number-field-validation-2"
          min="1"
          type="number"
          defaultValue="6"
        />
      </Field>
    </>
  )
}
