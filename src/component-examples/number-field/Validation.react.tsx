import { NumberField } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <NumberField
        id="number-field-validation-1"
        label="Bandmates"
        min={1}
        required
      />
      <NumberField
        defaultValue={6}
        endText="Only 4 sets of flatwounds left, whoops."
        error
        id="number-field-validation-2"
        label="Quantity"
        min={1}
      />
    </>
  )
}
