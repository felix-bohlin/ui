/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function EndText() {
  return (
    <NumberField
      endText="Up to 8 per table."
      id="number-field-end-text-1"
      label="Guests"
      max={8}
      min={1}
      value={2}
    />
  )
}
