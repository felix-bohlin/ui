import { Radio } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Radio defaultChecked name="radio-label-position" value="standard">
        Standard delivery
      </Radio>
      <Radio name="radio-label-position" orientation="vertical" value="express">
        Express delivery
      </Radio>
    </>
  )
}
