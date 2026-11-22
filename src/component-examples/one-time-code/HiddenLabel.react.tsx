import { OneTimeCode } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <OneTimeCode
      hideLabel
      htmlFor="one-time-code-hidden-label-1"
      label="Verification code"
    >
      <input
        autoComplete="one-time-code"
        id="one-time-code-hidden-label-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
      />
    </OneTimeCode>
  )
}
