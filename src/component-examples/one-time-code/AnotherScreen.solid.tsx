/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function AnotherScreen() {
  return (
    <OneTimeCode
      autocomplete="off"
      endText="The code is on your TV, under Settings and Link a device."
      label="Code from your TV"
      name="code"
      required
    />
  )
}
