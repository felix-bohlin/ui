import { Radio } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Radio defaultChecked name="radio-label-position" value="default">
        Default
      </Radio>
      <Radio name="radio-label-position" orientation="vertical" value="stack">
        Stack
      </Radio>
    </>
  )
}
