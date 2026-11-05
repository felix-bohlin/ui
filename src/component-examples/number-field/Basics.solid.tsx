/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Basics() {
  return (
    <NumberField
      id="number-field-basics-1"
      label="Quantity"
      max={10}
      min={1}
      value={1}
    />
  )
}
