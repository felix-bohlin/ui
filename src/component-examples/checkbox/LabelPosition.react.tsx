import { Checkbox } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Checkbox name="checkbox-label-position">Default</Checkbox>
      <Checkbox stack name="checkbox-label-position">
        Stack
      </Checkbox>
    </>
  )
}
