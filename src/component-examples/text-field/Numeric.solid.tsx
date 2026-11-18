/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Numeric() {
  return (
    <TextField
      inputmode="numeric"
      label="Verification code"
      pattern="[0-9]*"
      placeholder="123456"
    />
  )
}
