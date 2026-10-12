import { Checkbox } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-variants" hideLabel>
        Checked
      </Checkbox>
      <Checkbox name="checkbox-variants" hideLabel>
        Unchecked
      </Checkbox>
      <Checkbox indeterminate name="checkbox-variants" hideLabel>
        Indeterminate
      </Checkbox>
      <Checkbox disabled name="checkbox-variants" hideLabel>
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-variants" hideLabel>
        Checked and disabled
      </Checkbox>
    </>
  )
}
