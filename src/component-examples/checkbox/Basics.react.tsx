import { Checkbox } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-basics" hideLabel>
        Checked
      </Checkbox>
      <Checkbox name="checkbox-basics" hideLabel>
        Unchecked
      </Checkbox>
      <Checkbox indeterminate name="checkbox-basics" hideLabel>
        Indeterminate
      </Checkbox>
      <Checkbox disabled name="checkbox-basics" hideLabel>
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-basics" hideLabel>
        Checked and disabled
      </Checkbox>
    </>
  )
}
