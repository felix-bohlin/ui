import { Range } from "opui-css/react"

export default function Value() {
  return (
    <Range label="Hue" min="0" max="360" defaultValue="250" valueSuffix="°" />
  )
}
