/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function File() {
  return (
    <>
      <TextField accept="image/*" label="Avatar" type="file" />
      <TextField label="Attachments" type="file" variant="filled" />
    </>
  )
}
