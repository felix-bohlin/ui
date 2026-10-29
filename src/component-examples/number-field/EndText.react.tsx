import { NumberField } from "opui-css/react"

export default function EndText() {
  return (
    <NumberField
      defaultValue={2}
      endText="Up to 8 per table."
      id="number-field-end-text-1"
      label="Guests"
      max={8}
      min={1}
    />
  )
}
