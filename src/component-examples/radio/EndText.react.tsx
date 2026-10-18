import { Radio } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Radio
        name="radio-end-text"
        value="default"
        defaultChecked
        endText="Supporting text"
      >
        Default
      </Radio>
      <Radio
        name="radio-end-text"
        value="stack"
        stack
        endText="Supporting text"
      >
        Stack
      </Radio>
    </>
  )
}
