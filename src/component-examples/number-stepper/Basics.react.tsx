import { NumberStepper } from "opui-css/react"

export default function Basics() {
  return (
    <NumberStepper
      defaultValue={1}
      id="number-stepper-basics-1"
      label="Quantity"
      max={10}
      min={1}
    />
  )
}
