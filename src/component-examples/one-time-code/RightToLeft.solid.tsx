/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function RightToLeft() {
  return (
    <div dir="rtl" lang="ar">
      <OneTimeCode for="one-time-code-right-to-left-1" label="رمز التحقق">
        <input
          autocomplete="one-time-code"
          id="one-time-code-right-to-left-1"
          inputmode="numeric"
          maxlength="6"
          name="code"
          pattern="[0-9٠-٩۰-۹]{6}"
          defaultValue="905113"
        />
      </OneTimeCode>
    </div>
  )
}
