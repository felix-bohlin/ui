import { Checkbox } from "opui-css/react"

export default function SupportingText() {
  return (
    <>
      <Checkbox name="checkbox-supporting-text" endText="Supporting text">
        Default
      </Checkbox>
      <Checkbox stack name="checkbox-supporting-text" endText="Supporting text">
        Stack
      </Checkbox>
    </>
  )
}
