import { Checkbox } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Checkbox name="checkbox-validation" required>
          I accept the terms
        </Checkbox>
        <Checkbox name="checkbox-validation" orientation="vertical" required>
          I am 18 or older
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox
          defaultChecked
          endText="Only in Bassbook Gold, sorry."
          error
          name="checkbox-validation"
        >
          Daily tab backups
        </Checkbox>
        <Checkbox
          endText="Accept the terms to continue."
          error
          name="checkbox-validation"
          orientation="vertical"
        >
          I accept the terms
        </Checkbox>
      </div>
    </>
  )
}
