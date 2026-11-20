/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Basics() {
  return (
    <NumberField for="number-field-basics-1" label="Quantity">
      <input
        id="number-field-basics-1"
        max="10"
        min="1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
