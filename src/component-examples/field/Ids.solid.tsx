/** @jsxImportSource @solidjs/web */
import { createUniqueId } from "solid-js"
import { Field, StepButton } from "opui-css/solid"

export default function Ids() {
  const id = createUniqueId()
  return (
    <Field
      autoFit
      end={<StepButton command="--step-up" for={id} />}
      endText="Up to 10 per order."
      for={id}
      label="Quantity"
      start={<StepButton command="--step-down" for={id} />}
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
