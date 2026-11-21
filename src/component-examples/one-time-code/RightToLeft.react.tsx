import { OneTimeCode } from "opui-css/react"

export default function RightToLeft() {
  return (
    <div dir="rtl" lang="ar">
      <OneTimeCode htmlFor="one-time-code-right-to-left-1" label="رمز التحقق">
        <input
          autoComplete="one-time-code"
          id="one-time-code-right-to-left-1"
          inputMode="numeric"
          maxLength={6}
          name="code"
          pattern="[0-9٠-٩۰-۹]{6}"
          defaultValue="905113"
        />
      </OneTimeCode>
    </div>
  )
}
