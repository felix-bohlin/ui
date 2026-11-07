import { Radio } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Radio
        defaultChecked
        endText="Supporting text"
        name="radio-end-text"
        value="default"
      >
        Default
      </Radio>
      <Radio
        endText="Supporting text"
        name="radio-end-text"
        orientation="vertical"
        value="stack"
      >
        Stack
      </Radio>
    </>
  )
}
