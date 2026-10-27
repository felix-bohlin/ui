import { NumberStepper } from "opui-css/react"

export default function Disabled() {
  return (
    <NumberStepper
      defaultValue={1}
      disabled
      id="number-stepper-disabled-1"
      label="Quantity"
    />
  )
}
