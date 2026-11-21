/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Numeric() {
  return (
    <TextField for="text-field-numeric-1" label="Verification code">
      <input
        id="text-field-numeric-1"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="123456"
      />
    </TextField>
  )
}
