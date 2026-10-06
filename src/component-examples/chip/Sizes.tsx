import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Chip size="small" label="Small" />
      <Chip label="Default" />
      <Chip size="large" label="Large" />
      <Chip
        multiline
        style="max-width: 30ch"
        label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales."
      />
    </>
  )
}
