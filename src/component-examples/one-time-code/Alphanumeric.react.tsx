import { OneTimeCode } from "opui-css/react"

export default function Alphanumeric() {
  return (
    <OneTimeCode
      alphanumeric
      defaultValue="k7q"
      label="Recovery code"
      name="recovery-code"
    />
  )
}
