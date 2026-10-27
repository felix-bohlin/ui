import { NumberStepper } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <NumberStepper
        defaultValue={1}
        id="number-stepper-variants-1"
        label="Outlined"
      />
      <NumberStepper
        defaultValue={1}
        id="number-stepper-variants-2"
        label="Filled"
        variant="filled"
      />
    </>
  )
}
