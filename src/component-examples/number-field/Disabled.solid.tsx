/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Disabled() {
  return (
    <NumberField
      defaultValue={1}
      disabled
      id="number-field-disabled-1"
      label="Quantity"
    />
  )
}
