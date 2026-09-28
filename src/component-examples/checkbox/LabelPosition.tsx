import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox name="checkbox">Default</Checkbox>
      <Checkbox stack name="checkbox">
        Stack
      </Checkbox>
    </>
  )
}
