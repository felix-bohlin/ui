import { Radio } from "opui-css/react"

export default function SupportingText() {
  return (
    <>
      <Radio
        name="radio-supporting-text"
        value="default"
        defaultChecked
        endText="Supporting text"
      >
        Default
      </Radio>
      <Radio
        name="radio-supporting-text"
        value="stack"
        stack
        endText="Supporting text"
      >
        Stack
      </Radio>
    </>
  )
}
