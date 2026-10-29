import { Checkbox } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Checkbox name="checkbox-end-text" endText="Supporting text">
        Default
      </Checkbox>
      <Checkbox
        orientation="vertical"
        name="checkbox-end-text"
        endText="Supporting text"
      >
        Stack
      </Checkbox>
    </>
  )
}
