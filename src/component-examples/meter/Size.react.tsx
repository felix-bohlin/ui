import { Meter } from "opui-css/react"

export default function Size() {
  return (
    <Meter
      aria-label="Battery"
      max="100"
      style={{ "--_block-size": "var(--ui-space-3)" }}
      value="80"
    />
  )
}
