import { OneTimeCode } from "opui-css/react"

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
