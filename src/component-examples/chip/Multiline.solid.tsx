/** @jsxImportSource @solidjs/web */
import { Chip } from "opui-css/solid"

export default function Multiline() {
  return (
    <Chip
      label="Free returns within 30 days on every order"
      multiline
      style="max-inline-size: 30ch"
    />
  )
}
