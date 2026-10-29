import { NumberField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <NumberField
        defaultValue={1}
        id="number-field-variants-1"
        label="Outlined"
      />
      <NumberField
        defaultValue={1}
        id="number-field-variants-2"
        label="Filled"
        variant="filled"
      />
    </>
  )
}
