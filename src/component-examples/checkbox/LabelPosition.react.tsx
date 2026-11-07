import { Checkbox } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Checkbox name="checkbox-label-position">Default</Checkbox>
      <Checkbox name="checkbox-label-position" orientation="vertical">
        Stack
      </Checkbox>
    </>
  )
}
