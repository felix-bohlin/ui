import { Radio } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Radio
        defaultChecked
        endText="Arrives in 3 to 5 days."
        name="radio-end-text"
        value="standard"
      >
        Standard delivery
      </Radio>
      <Radio
        endText="Arrives tomorrow."
        name="radio-end-text"
        orientation="vertical"
        value="express"
      >
        Express delivery
      </Radio>
    </>
  )
}
