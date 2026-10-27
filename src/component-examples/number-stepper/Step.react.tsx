import { NumberStepper } from "opui-css/react"

export default function Step() {
  return (
    <NumberStepper
      defaultValue={0.5}
      id="number-stepper-step-1"
      label="Opacity"
      max={1}
      min={0}
      step={0.1}
    />
  )
}
