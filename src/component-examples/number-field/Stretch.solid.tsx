/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Stretch() {
  return (
    <NumberField
      defaultValue={1}
      id="number-field-stretch-1"
      label="Quantity"
      max={10}
      min={1}
      stretch
    />
  )
}
