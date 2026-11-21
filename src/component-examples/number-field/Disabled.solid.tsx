/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Disabled() {
  return (
    <NumberField for="number-field-disabled-1" label="Quantity">
      <input
        disabled
        id="number-field-disabled-1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
