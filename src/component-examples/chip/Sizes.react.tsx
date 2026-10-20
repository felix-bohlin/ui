import { Chip } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Chip size="x-small" label="x-small" />
      <Chip size="small" label="Small" />
      <Chip label="Default" />
      <Chip size="large" label="Large" />
      <Chip
        multiline
        style={{ maxInlineSize: "30ch" }}
        label="Free returns within 30 days on every order"
      />
    </>
  )
}
