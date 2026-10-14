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
        style={{ maxWidth: "30ch" }}
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales."
      />
    </>
  )
}
