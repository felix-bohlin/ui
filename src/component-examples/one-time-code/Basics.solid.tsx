/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function Basics() {
  return (
    <OneTimeCode
      endText="The code expires in 10 minutes."
      label="Verification code"
      name="code"
      required
    />
  )
}
