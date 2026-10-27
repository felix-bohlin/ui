import { ColorField } from "opui-css/react"

export default function Opacity() {
  return (
    <ColorField
      alpha
      defaultValue="oklch(0.3 0.05 260 / 0.6)"
      id="color-field-opacity-1"
      label="Overlay"
    />
  )
}
