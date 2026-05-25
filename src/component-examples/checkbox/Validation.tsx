import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox name="checkbox" invalid>Invalid</Checkbox>
      <Checkbox name="checkbox" valid>Valid</Checkbox>
    </>
  )
}
