import { OneTimeCode } from "opui-css/react"

export default function Alphanumeric() {
  return (
    <OneTimeCode htmlFor="one-time-code-alphanumeric-1" label="Recovery code">
      <input
        autoCapitalize="characters"
        autoComplete="one-time-code"
        id="one-time-code-alphanumeric-1"
        maxLength={6}
        name="recovery-code"
        pattern="[A-Za-z0-9]{6}"
        spellCheck="false"
        defaultValue="k7q"
      />
    </OneTimeCode>
  )
}
