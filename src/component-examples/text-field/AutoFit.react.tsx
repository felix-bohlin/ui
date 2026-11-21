import { TextField } from "opui-css/react"

export default function AutoFit() {
  return (
    <TextField autoFit htmlFor="text-field-auto-fit-1" label="Project name">
      <input id="text-field-auto-fit-1" placeholder="my-project" />
    </TextField>
  )
}
