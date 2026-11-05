/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Disabled() {
  return (
    <NumberField
      disabled
      id="number-field-disabled-1"
      label="Quantity"
      value={1}
    />
  )
}
