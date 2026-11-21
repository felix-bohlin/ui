/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function NoLabel() {
  return (
    <TextField for="text-field-no-label-1">
      <input
        aria-label="Search"
        id="text-field-no-label-1"
        placeholder="Search"
      />
    </TextField>
  )
}
