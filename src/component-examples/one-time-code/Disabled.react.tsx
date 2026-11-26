import { OneTimeCode } from "opui-css/react"

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
