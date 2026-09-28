import { Checkbox } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <div class="example-row ui-spacious">
        <Checkbox required name="checkbox">
          Default
        </Checkbox>
        <Checkbox stack required name="checkbox">
          Stack
        </Checkbox>
      </div>
      <div class="example-row ui-spacious">
        <Checkbox error checked name="checkbox" endText="Check yourself">
          Default
        </Checkbox>
        <Checkbox
          stack
          error
          name="checkbox"
          endText="Before you wreck yourself"
        >
          Stack
        </Checkbox>
      </div>
    </>
  )
}
