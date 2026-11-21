import { NumberField } from "opui-css/react"

export default function Disabled() {
  return (
    <NumberField htmlFor="number-field-disabled-1" label="Quantity">
      <input
        disabled
        id="number-field-disabled-1"
        type="number"
        defaultValue="1"
      />
    </NumberField>
  )
}
