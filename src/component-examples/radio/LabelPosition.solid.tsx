/** @jsxImportSource @solidjs/web */
import { Radio } from "opui-css/solid"

export default function LabelPosition() {
  return (
    <>
      <Radio checked name="radio-label-position" value="default">
        Default
      </Radio>
      <Radio name="radio-label-position" orientation="vertical" value="stack">
        Stack
      </Radio>
    </>
  )
}
