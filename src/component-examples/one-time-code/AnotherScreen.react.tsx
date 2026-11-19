import { OneTimeCode } from "opui-css/react"

export default function AnotherScreen() {
  return (
    <OneTimeCode
      autoComplete="off"
      endText="The code is on your TV, under Settings and Link a device."
      label="Code from your TV"
      name="code"
      required
    />
  )
}
