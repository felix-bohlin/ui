import { ColorField } from "opui-css/react"

export default function EndText() {
  return (
    <ColorField
      defaultValue="oklch(0.62 0.19 260)"
      endText="Paste any CSS color. It is saved as oklch()."
      id="color-field-end-text-1"
      label="Accent"
    />
  )
}
