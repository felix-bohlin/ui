import { OneTimeCode } from "opui-css/react"

export default function Validation() {
  return (
    <OneTimeCode
      endText="That code has expired. Request a new one."
      htmlFor="one-time-code-validation-1"
      label="Verification code"
    >
      <input
        aria-describedby="one-time-code-validation-1-end-text"
        aria-invalid="true"
        autoComplete="one-time-code"
        id="one-time-code-validation-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        required
        defaultValue="482193"
      />
    </OneTimeCode>
  )
}
