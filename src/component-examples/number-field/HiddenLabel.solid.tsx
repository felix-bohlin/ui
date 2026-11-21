/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function HiddenLabel() {
  return (
    <NumberField for="number-field-hidden-label-1" hideLabel label="Quantity">
      <input
        id="number-field-hidden-label-1"
        min="1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
