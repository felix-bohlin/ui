import { Checkbox } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Checkbox name="checkbox-validation" required>
          Default
        </Checkbox>
        <Checkbox name="checkbox-validation" orientation="vertical" required>
          Stack
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox
          defaultChecked
          endText="Check yourself"
          error
          name="checkbox-validation"
        >
          Default
        </Checkbox>
        <Checkbox
          endText="Before you wreck yourself"
          error
          name="checkbox-validation"
          orientation="vertical"
        >
          Stack
        </Checkbox>
      </div>
    </>
  )
}
