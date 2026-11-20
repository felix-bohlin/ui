/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <TextField for="text-field-variants-1" label="Outlined">
        <input id="text-field-variants-1" placeholder="Your name" />
      </TextField>
      <TextField for="text-field-variants-2" label="Filled" variant="filled">
        <input id="text-field-variants-2" placeholder="Your name" />
      </TextField>
    </>
  )
}
