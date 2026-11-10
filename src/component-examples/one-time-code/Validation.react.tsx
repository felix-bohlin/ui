import { OneTimeCode } from "opui-css/react"

export default function Validation() {
  return (
    <OneTimeCode
      defaultValue="482193"
      endText="That code has expired. Request a new one."
      error
      label="Verification code"
      name="code"
      required
    />
  )
}
