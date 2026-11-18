/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Basics() {
  return (
    <NumberField
      defaultValue={1}
      id="number-field-basics-1"
      label="Quantity"
      max={10}
      min={1}
    />
  )
}
