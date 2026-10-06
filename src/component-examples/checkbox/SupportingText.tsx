import { Checkbox } from "opui-css/solid"

export default function Example() {
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
