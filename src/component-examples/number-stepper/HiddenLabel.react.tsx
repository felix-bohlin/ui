import { NumberStepper } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <NumberStepper
      defaultValue={1}
      hideLabel
      id="number-stepper-hidden-label-1"
      label="Quantity"
      min={1}
    />
  )
}
