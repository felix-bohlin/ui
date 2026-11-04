import { OneTimeCode } from "opui-css/react"

export default function Validation() {
  return (
    <OneTimeCode
      defaultValue="4821"
      endText="Enter all 6 digits."
      error
      label="Verification code"
      name="code"
      required
    />
  )
}
