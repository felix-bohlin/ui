import { Chip } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Chip label="x-small" size="x-small" />
      <Chip label="Small" size="small" />
      <Chip label="Medium" />
      <Chip label="Large" size="large" />
      <Chip
        label="Free returns within 30 days on every order"
        multiline
        style={{ maxInlineSize: "30ch" }}
      />
    </>
  )
}
