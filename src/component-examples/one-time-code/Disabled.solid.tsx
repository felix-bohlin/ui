/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Disabled() {
  return (
    <OneTimeCode
      defaultValue="905"
      disabled
      label="Verification code"
      name="code"
    />
  )
}
