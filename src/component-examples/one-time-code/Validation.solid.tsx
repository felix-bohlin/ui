/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Validation() {
  return (
    <OneTimeCode
      endText="Enter all 6 digits."
      error
      label="Verification code"
      name="code"
      required
      value="4821"
    />
  )
}
