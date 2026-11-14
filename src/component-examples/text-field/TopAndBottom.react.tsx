import { TextField } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Holly Humbucker"
        top="Shown on your profile"
      />

      <TextField
        bottom="Plain text, no links"
        characterCount
        label="Bass motto"
        maxLength={80}
        placeholder="Turn it up, not down"
      />
    </>
  )
}
