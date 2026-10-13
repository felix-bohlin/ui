import { Checkbox } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Checkbox hideLabel size="x-small" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel size="small" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
        <Checkbox hideLabel size="large" defaultChecked name="checkbox-sizes">
          Label
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox size="x-small" defaultChecked name="checkbox-sizes">
          x-small
        </Checkbox>
        <Checkbox size="small" defaultChecked name="checkbox-sizes">
          Small
        </Checkbox>
        <Checkbox defaultChecked name="checkbox-sizes">
          Default
        </Checkbox>
        <Checkbox size="large" defaultChecked name="checkbox-sizes">
          Large
        </Checkbox>
      </div>
    </>
  )
}
