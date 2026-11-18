import { Checkbox } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="x-small">
          X-small
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="small">
          Small
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes">
          Medium
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="large">
          Large
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox defaultChecked name="checkbox-sizes" size="x-small">
          X-small
        </Checkbox>
        <Checkbox defaultChecked name="checkbox-sizes" size="small">
          Small
        </Checkbox>
        <Checkbox defaultChecked name="checkbox-sizes">
          Medium
        </Checkbox>
        <Checkbox defaultChecked name="checkbox-sizes" size="large">
          Large
        </Checkbox>
      </div>
    </>
  )
}
