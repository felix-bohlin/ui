import { ColorField } from "opui-css/react"

export default function SwatchOnly() {
  return (
    <ColorField
      defaultValue="oklch(0.7 0.18 30)"
      id="color-field-swatch-only-1"
      label="Accent"
      swatchOnly
    />
  )
}
