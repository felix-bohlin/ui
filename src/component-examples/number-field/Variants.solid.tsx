/** @jsxImportSource @solidjs/web */
import { NumberField } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <NumberField for="number-field-variants-1" label="Guests">
        <input id="number-field-variants-1" type="number" defaultValue="1" />
      </NumberField>
      <NumberField
        for="number-field-variants-2"
        label="Nights"
        variant="filled"
      >
        <input id="number-field-variants-2" type="number" defaultValue="1" />
      </NumberField>
    </>
  )
}
