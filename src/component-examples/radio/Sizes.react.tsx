import { Radio } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Radio
          defaultChecked
          hideLabel
          name="radio-sizes-x-small"
          size="x-small"
          value="selected"
        >
          Selected
        </Radio>
        <Radio
          defaultChecked
          hideLabel
          name="radio-sizes-small"
          size="small"
          value="selected"
        >
          Selected
        </Radio>
        <Radio
          defaultChecked
          hideLabel
          name="radio-sizes-medium"
          value="selected"
        >
          Selected
        </Radio>
        <Radio
          defaultChecked
          hideLabel
          name="radio-sizes-large"
          size="large"
          value="selected"
        >
          Selected
        </Radio>
      </div>
      <div className="example-row">
        <Radio name="radio-sizes-x-small" size="x-small" value="other">
          X-small
        </Radio>
        <Radio name="radio-sizes-small" size="small" value="other">
          Small
        </Radio>
        <Radio name="radio-sizes-medium" value="other">
          Medium
        </Radio>
        <Radio name="radio-sizes-large" size="large" value="other">
          Large
        </Radio>
      </div>
    </>
  )
}
