/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Spread() {
  return (
    <>
      <NumberField
        endText="Up to 8 per table."
        for="number-field-spread-1"
        label="Guests"
        spread
        startText="Count children too."
      >
        <input
          aria-describedby="number-field-spread-1-start-text number-field-spread-1-end-text"
          id="number-field-spread-1"
          max="8"
          min="1"
          type="number"
          defaultValue="2"
        />
      </NumberField>
      <NumberField
        for="number-field-spread-2"
        label="Nights"
        spread
        startText="Check-out is at 11:00."
        variant="filled"
      >
        <input
          aria-describedby="number-field-spread-2-start-text"
          id="number-field-spread-2"
          max="14"
          min="1"
          type="number"
          defaultValue="3"
        />
      </NumberField>
    </>
  )
}
