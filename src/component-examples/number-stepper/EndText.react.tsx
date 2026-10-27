import { NumberStepper } from "opui-css/react"

export default function EndText() {
  return (
    <NumberStepper
      defaultValue={2}
      endText="Up to 8 per table."
      id="number-stepper-end-text-1"
      label="Guests"
      max={8}
      min={1}
    />
  )
}
