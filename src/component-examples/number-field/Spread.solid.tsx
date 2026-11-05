/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Spread() {
  return (
    <>
      <NumberField
        endText="Up to 8 per table."
        id="number-field-spread-1"
        label="Guests"
        max={8}
        min={1}
        spread
        startText="Count children too."
        value={2}
      />
      <NumberField
        id="number-field-spread-2"
        label="Nights"
        max={14}
        min={1}
        spread
        startText="Check-out is at 11:00."
        value={3}
        variant="filled"
      />
    </>
  )
}
