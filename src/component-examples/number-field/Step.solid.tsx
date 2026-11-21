/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Step() {
  return (
    <NumberField for="number-field-step-1" label="Opacity">
      <input
        id="number-field-step-1"
        max="1"
        min="0"
        step="0.1"
        type="number"
        defaultValue="0.5"
      />
    </NumberField>
  )
}
