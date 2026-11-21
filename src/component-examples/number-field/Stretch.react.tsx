import { NumberField } from "opui-css/react"

export default function Stretch() {
  return (
    <NumberField htmlFor="number-field-stretch-1" label="Quantity" stretch>
      <input
        id="number-field-stretch-1"
        max="10"
        min="1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
