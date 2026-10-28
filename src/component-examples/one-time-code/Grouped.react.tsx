import { OneTimeCode } from "opui-css/react"

export default function Grouped() {
  return (
    <OneTimeCode
      label="Verification code"
      grouped
      name="code"
      required
      value="482"
    />
  )
}
