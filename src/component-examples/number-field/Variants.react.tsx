import { NumberField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <NumberField
        defaultValue={1}
        id="number-field-variants-1"
        label="Guests"
      />
      <NumberField
        defaultValue={1}
        id="number-field-variants-2"
        label="Nights"
        variant="filled"
      />
    </>
  )
}
