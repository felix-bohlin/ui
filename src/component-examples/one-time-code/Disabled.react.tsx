import { OneTimeCode } from "opui-css/react"

export default function Disabled() {
  return (
    <OneTimeCode htmlFor="one-time-code-disabled-1" label="Verification code">
      <input
        autoComplete="one-time-code"
        disabled
        id="one-time-code-disabled-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        defaultValue="905"
      />
    </OneTimeCode>
  )
}
