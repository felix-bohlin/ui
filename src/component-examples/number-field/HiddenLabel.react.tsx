import { NumberField } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <NumberField
      hideLabel
      htmlFor="number-field-hidden-label-1"
      label="Quantity"
    >
      <input
        id="number-field-hidden-label-1"
        min="1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
