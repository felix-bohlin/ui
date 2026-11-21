import { NumberField } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <NumberField
        htmlFor="number-field-sizes-1"
        label="X-small"
        size="x-small"
      >
        <input id="number-field-sizes-1" type="number" defaultValue="1" />
      </NumberField>
      <NumberField htmlFor="number-field-sizes-2" label="Small" size="small">
        <input id="number-field-sizes-2" type="number" defaultValue="1" />
      </NumberField>
      <NumberField htmlFor="number-field-sizes-3" label="Medium">
        <input id="number-field-sizes-3" type="number" defaultValue="1" />
      </NumberField>
      <NumberField htmlFor="number-field-sizes-4" label="Large" size="large">
        <input id="number-field-sizes-4" type="number" defaultValue="1" />
      </NumberField>
    </>
  )
}
