import { ColorField } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <ColorField
        defaultValue="oklch(0.7 0.14 150)"
        id="color-field-sizes-1"
        label="x-small"
        size="x-small"
      />
      <ColorField
        defaultValue="oklch(0.7 0.14 150)"
        id="color-field-sizes-2"
        label="Small"
        size="small"
      />
      <ColorField
        defaultValue="oklch(0.7 0.14 150)"
        id="color-field-sizes-3"
        label="Medium"
      />
      <ColorField
        defaultValue="oklch(0.7 0.14 150)"
        id="color-field-sizes-4"
        label="Large"
        size="large"
      />
    </>
  )
}
