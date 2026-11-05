/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Alphanumeric() {
  return (
    <OneTimeCode
      alphanumeric
      label="Recovery code"
      name="recovery-code"
      value="k7q"
    />
  )
}
