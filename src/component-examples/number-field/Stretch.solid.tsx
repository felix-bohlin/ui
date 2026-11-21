/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Stretch() {
  return (
    <NumberField for="number-field-stretch-1" label="Quantity" stretch>
      <input
        id="number-field-stretch-1"
        max="10"
        min="1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
