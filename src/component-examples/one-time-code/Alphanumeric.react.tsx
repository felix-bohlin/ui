import { OneTimeCode } from "opui-css/react"

export default function Alphanumeric() {
  return (
    <OneTimeCode
      label="Recovery code"
      alphanumeric
      name="recovery-code"
      value="k7q"
    />
  )
}
