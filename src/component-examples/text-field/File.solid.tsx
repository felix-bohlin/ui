/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function File() {
  return (
    <>
      <TextField label="Label" type="file" />
      <TextField label="Label" type="file" variant="filled" />
    </>
  )
}
