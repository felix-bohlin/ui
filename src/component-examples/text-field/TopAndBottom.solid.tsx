/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function TopAndBottom() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Ada Lovelace"
        top="Shown on your profile"
      />

      <TextField
        bottom="0 / 80"
        label="Tagline"
        placeholder="A short description"
      />
    </>
  )
}
