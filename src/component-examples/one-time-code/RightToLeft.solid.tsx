/** @jsxImportSource @solidjs/web */
import { OneTimeCode } from "opui-css/solid"

export default function RightToLeft() {
  return (
    <div dir="rtl" lang="ar">
      <OneTimeCode label="رمز التحقق" name="code" value="905113" />
    </div>
  )
}
