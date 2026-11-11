import { OneTimeCode } from "opui-css/react"

export default function RightToLeft() {
  return (
    <div dir="rtl" lang="ar">
      <OneTimeCode
        defaultValue="905113"
        label="رمز التحقق"
        name="code"
        pattern="[0-9٠-٩۰-۹]{6}"
      />
    </div>
  )
}
