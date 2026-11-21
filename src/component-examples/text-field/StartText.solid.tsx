/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function StartText() {
  return (
    <TextField
      for="text-field-start-text-1"
      label="Name"
      startText="As it appears on your ID"
    >
      <input
        aria-describedby="text-field-start-text-1-start-text"
        id="text-field-start-text-1"
      />
    </TextField>
  )
}
