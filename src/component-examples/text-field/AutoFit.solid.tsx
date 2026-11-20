/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function AutoFit() {
  return (
    <TextField autoFit for="text-field-auto-fit-1" label="Project name">
      <input id="text-field-auto-fit-1" placeholder="my-project" />
    </TextField>
  )
}
