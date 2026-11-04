import { NumberField } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <NumberField
        defaultValue={1}
        id="number-field-sizes-1"
        label="x-small"
        size="x-small"
      />
      <NumberField
        defaultValue={1}
        id="number-field-sizes-2"
        label="Small"
        size="small"
      />
      <NumberField defaultValue={1} id="number-field-sizes-3" label="Medium" />
      <NumberField
        defaultValue={1}
        id="number-field-sizes-4"
        label="Large"
        size="large"
      />
    </>
  )
}
