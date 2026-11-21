import { NumberField } from "opui-css/react"

export default function EndText() {
  return (
    <NumberField
      endText="Up to 8 per table."
      htmlFor="number-field-end-text-1"
      label="Guests"
    >
      <input
        aria-describedby="number-field-end-text-1-end-text"
        id="number-field-end-text-1"
        max="8"
        min="1"
        type="number"
        defaultValue="2"
      />
    </NumberField>
  )
}
