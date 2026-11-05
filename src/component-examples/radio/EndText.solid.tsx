/** @jsxImportSource @solidjs/web */
import { Radio } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Radio
        checked
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
