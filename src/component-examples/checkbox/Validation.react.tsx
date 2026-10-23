import { Checkbox } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row ui-spacious">
        <Checkbox required name="checkbox-validation">
          Default
        </Checkbox>
        <Checkbox orientation="vertical" required name="checkbox-validation">
          Stack
        </Checkbox>
      </div>
      <div className="example-row ui-spacious">
        <Checkbox
          error
          defaultChecked
          name="checkbox-validation"
          endText="Check yourself"
        >
          Default
        </Checkbox>
        <Checkbox
          orientation="vertical"
          error
          name="checkbox-validation"
          endText="Before you wreck yourself"
        >
          Stack
        </Checkbox>
      </div>
    </>
  )
}
