import { NumberField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <NumberField htmlFor="number-field-variants-1" label="Guests">
        <input id="number-field-variants-1" type="number" defaultValue="1" />
      </NumberField>
      <NumberField
        htmlFor="number-field-variants-2"
        label="Nights"
        variant="filled"
      >
        <input id="number-field-variants-2" type="number" defaultValue="1" />
      </NumberField>
    </>
  )
}
