import { NumberField } from "opui-css/react"

export default function Spread() {
  return (
    <>
      <NumberField
        defaultValue={2}
        endText="Up to 8 per table."
        id="number-field-spread-1"
        label="Guests"
        max={8}
        min={1}
        spread
        startText="Count children too."
      />
      <NumberField
        defaultValue={3}
        id="number-field-spread-2"
        label="Nights"
        max={14}
        min={1}
        spread
        startText="Check-out is at 11:00."
        variant="filled"
      />
    </>
  )
}
