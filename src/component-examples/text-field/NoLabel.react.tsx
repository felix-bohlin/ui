import { TextField } from "opui-css/react"

export default function NoLabel() {
  return (
    <TextField htmlFor="text-field-no-label-1">
      <input
        aria-label="Search"
        id="text-field-no-label-1"
        placeholder="Search"
      />
    </TextField>
  )
}
