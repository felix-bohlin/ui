import { OneTimeCode } from "opui-css/react"

export default function Grouped() {
  return (
    <OneTimeCode
      grouped
      htmlFor="one-time-code-grouped-1"
      label="Verification code"
    >
      <input
        autoComplete="one-time-code"
        id="one-time-code-grouped-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        required
        defaultValue="482"
      />
    </OneTimeCode>
  )
}
