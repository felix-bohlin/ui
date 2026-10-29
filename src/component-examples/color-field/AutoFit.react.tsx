import { ColorField } from "opui-css/react"

export default function AutoFit() {
  return (
    <ColorField
      defaultValue="oklch(0.6 0.15 250)"
      autoFit
      id="color-field-auto-fit-1"
      label="Brand color"
    />
  )
}
