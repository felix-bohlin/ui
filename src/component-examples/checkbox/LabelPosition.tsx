import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox name="checkbox-label-position">Default</Checkbox>
      <Checkbox stack name="checkbox-label-position">
        Stack
      </Checkbox>
    </>
  )
}
