import { TextField } from "opui-css/react"

export default function Headers() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Ada Lovelace"
        header="Shown on your profile"
      />

      <TextField
        label="Tagline"
        placeholder="A short description"
        footer="0 / 80"
      />
    </>
  )
}
