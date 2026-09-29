import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row ui-spacious">
        <Checkbox required name="checkbox-validation">
          Default
        </Checkbox>
        <Checkbox stack required name="checkbox-validation">
          Stack
        </Checkbox>
      </div>
      <div class="example-row ui-spacious">
        <Checkbox
          error
          checked
          name="checkbox-validation"
          endText="Check yourself"
        >
          Default
        </Checkbox>
        <Checkbox
          stack
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
