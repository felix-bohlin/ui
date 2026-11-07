import { NumberField } from "opui-css/react"

export default function Step() {
  return (
    <NumberField
      defaultValue={0.5}
      id="number-field-step-1"
      label="Opacity"
      max={1}
      min={0}
      step={0.1}
    />
  )
}
