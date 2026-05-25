import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Checkbox labelPosition="start" name="checkbox">Label start</Checkbox>
      <Checkbox name="checkbox">Label end (default)</Checkbox>
    </>
  )
}
