import { OneTimeCode } from "opui-css/react"

export default function Basics() {
  return (
    <OneTimeCode
      endText="The code expires in 10 minutes."
      htmlFor="one-time-code-basics-1"
      label="Verification code"
    >
      <input
        aria-describedby="one-time-code-basics-1-end-text"
        autoComplete="one-time-code"
        id="one-time-code-basics-1"
        inputMode="numeric"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        required
      />
    </OneTimeCode>
  )
}
