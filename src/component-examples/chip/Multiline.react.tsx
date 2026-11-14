import { Chip } from "opui-css/react"

export default function Multiline() {
  return (
    <Chip
      label="Free returns within 30 days on every order"
      multiline
      style={{ maxInlineSize: "30ch" }}
    />
  )
}
