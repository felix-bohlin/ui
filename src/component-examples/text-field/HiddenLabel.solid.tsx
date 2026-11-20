/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function HiddenLabel() {
  return (
    <TextField for="text-field-hidden-label-1" hideLabel label="Search">
      <input
        id="text-field-hidden-label-1"
        placeholder="Search"
        type="search"
      />
    </TextField>
  )
}
