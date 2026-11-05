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
        bottom="Plain text, no links"
        characterCount
        label="Tagline"
        maxlength={80}
        placeholder="A short description"
      />
    </>
  )
}
