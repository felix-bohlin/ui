import { TextField } from "opui-css/react"

export default function Numeric() {
  return (
    <TextField htmlFor="text-field-numeric-1" label="Verification code">
      <input
        id="text-field-numeric-1"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="123456"
      />
    </TextField>
  )
}
