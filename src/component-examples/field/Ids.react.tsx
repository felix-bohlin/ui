import { useId } from "react"
import { Field, StepButton } from "opui-css/react"

export default function Ids() {
  const id = useId()
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" htmlFor={id} />}
      endText="Up to 10 per order."
      htmlFor={id}
      label="Quantity"
      start={<StepButton command="--step-down" htmlFor={id} />}
    >
      <input
        aria-describedby={`${id}-end-text`}
        defaultValue="1"
        id={id}
        max="10"
        min="1"
        type="number"
      />
    </Field>
  )
}
