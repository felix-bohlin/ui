import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox name="checkbox" endText="Supporting text">
        Default
      </Checkbox>
      <Checkbox stack name="checkbox" endText="Supporting text">
        Stack
      </Checkbox>
    </>
  )
}
