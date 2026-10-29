import { OneTimeCode } from "opui-css/react"

export default function Basics() {
  return (
    <OneTimeCode
      label="Verification code"
      endText="The code expires in 10 minutes."
      name="code"
      required
    />
  )
}
