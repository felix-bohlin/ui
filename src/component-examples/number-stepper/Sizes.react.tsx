import { NumberStepper } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <NumberStepper
        defaultValue={1}
        id="number-stepper-sizes-1"
        label="x-small"
        size="x-small"
      />
      <NumberStepper
        defaultValue={1}
        id="number-stepper-sizes-2"
        label="Small"
        size="small"
      />
      <NumberStepper
        defaultValue={1}
        id="number-stepper-sizes-3"
        label="Medium"
      />
      <NumberStepper
        defaultValue={1}
        id="number-stepper-sizes-4"
        label="Large"
        size="large"
      />
    </>
  )
}
