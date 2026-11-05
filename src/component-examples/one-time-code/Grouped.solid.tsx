/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Grouped() {
  return (
    <OneTimeCode
      grouped
      label="Verification code"
      name="code"
      required
      value="482"
    />
  )
}
