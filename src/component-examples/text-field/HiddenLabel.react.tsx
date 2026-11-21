import { TextField } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <TextField hideLabel htmlFor="text-field-hidden-label-1" label="Search">
      <input
        id="text-field-hidden-label-1"
        placeholder="Search"
        type="search"
      />
    </TextField>
  )
}
