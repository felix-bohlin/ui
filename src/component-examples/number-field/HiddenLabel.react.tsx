import { NumberField } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <NumberField
      defaultValue={1}
      hideLabel
      id="number-field-hidden-label-1"
      label="Quantity"
      min={1}
    />
  )
}
