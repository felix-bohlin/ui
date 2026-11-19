/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function LabelPosition() {
  return (
    <>
      <Checkbox name="checkbox-label-position">Gift wrap</Checkbox>
      <Checkbox name="checkbox-label-position" orientation="vertical">
        Gift message
      </Checkbox>
    </>
  )
}
