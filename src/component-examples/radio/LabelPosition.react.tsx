import { Radio } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Radio name="radio-label-position" value="default" defaultChecked>
        Default
      </Radio>
      <Radio name="radio-label-position" value="stack" stack>
        Stack
      </Radio>
    </>
  )
}
