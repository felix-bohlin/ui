/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Grouped() {
  return (
    <OneTimeCode
      defaultValue="482"
      grouped
      label="Verification code"
      name="code"
      required
    />
  )
}
