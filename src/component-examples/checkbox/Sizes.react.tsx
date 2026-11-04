import { Checkbox } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="x-small">
          Label
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="small">
          Label
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox defaultChecked hideLabel name="checkbox-sizes" size="large">
          Label
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox defaultChecked name="checkbox-sizes" size="x-small">
          x-small
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
