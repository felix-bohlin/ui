import { NumberStepper } from "opui-css/react"

export default function Stretch() {
  return (
    <NumberStepper
      defaultValue={1}
      id="number-stepper-stretch-1"
      label="Quantity"
      max={10}
      min={1}
      stretch
    />
  )
}
