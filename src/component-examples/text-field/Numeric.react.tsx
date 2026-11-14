import { TextField } from "opui-css/react"

export default function Numeric() {
  return (
    <TextField
      inputMode="numeric"
      label="Verification code"
      pattern="[0-9]*"
      placeholder="123456"
    />
  )
}
