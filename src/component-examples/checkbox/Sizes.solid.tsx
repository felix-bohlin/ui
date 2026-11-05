/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function Sizes() {
  return (
    <>
      <div class="example-row">
        <Checkbox checked hideLabel name="checkbox-sizes" size="x-small">
          X-small
        </Checkbox>
        <Checkbox checked hideLabel name="checkbox-sizes" size="small">
          Small
        </Checkbox>
        <Checkbox checked hideLabel name="checkbox-sizes">
          Medium
        </Checkbox>
        <Checkbox checked hideLabel name="checkbox-sizes" size="large">
          Large
        </Checkbox>
      </div>
      <div class="example-row">
        <Checkbox checked name="checkbox-sizes" size="x-small">
          X-small
        </Checkbox>
        <Checkbox checked name="checkbox-sizes" size="small">
          Small
        </Checkbox>
        <Checkbox checked name="checkbox-sizes">
          Medium
        </Checkbox>
        <Checkbox checked name="checkbox-sizes" size="large">
          Large
        </Checkbox>
      </div>
    </>
  )
}
