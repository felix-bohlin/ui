/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function HiddenLabel() {
  return (
    <NumberField
      hideLabel
      id="number-field-hidden-label-1"
      label="Quantity"
      min={1}
      value={1}
    />
  )
}
