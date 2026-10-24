import { TextField } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Ada Lovelace"
        top="Shown on your profile"
      />

      <TextField
        label="Tagline"
        placeholder="A short description"
        bottom="0 / 80"
      />
    </>
  )
}
