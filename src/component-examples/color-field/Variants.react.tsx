import { ColorField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <ColorField
        defaultValue="oklch(0.65 0.18 30)"
        id="color-field-variants-1"
        label="Outlined"
      />
      <ColorField
        defaultValue="oklch(0.65 0.18 30)"
        id="color-field-variants-2"
        label="Filled"
        variant="filled"
      />
    </>
  )
}
