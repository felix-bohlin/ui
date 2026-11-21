import { OneTimeCode } from "opui-css/react"

export default function AnotherScreen() {
  return (
    <OneTimeCode
      endText="The code is on your TV, under Settings and Link a device."
      htmlFor="one-time-code-another-screen-1"
      label="Code from your TV"
    >
      <input
        aria-describedby="one-time-code-another-screen-1-end-text"
        autoComplete="off"
        id="one-time-code-another-screen-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        required
      />
    </OneTimeCode>
  )
}
