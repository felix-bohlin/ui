/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Disabled() {
  return (
    <OneTimeCode disabled label="Verification code" name="code" value="905" />
  )
}
