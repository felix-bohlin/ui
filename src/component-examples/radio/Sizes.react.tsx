import { Radio } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Radio
          name="radio-sizes-x-small"
          size="x-small"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-small"
          size="small"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-default"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
        <Radio
          name="radio-sizes-large"
          size="large"
          value="selected"
          defaultChecked
          hideLabel
        >
          Selected
        </Radio>
      </div>
      <div className="example-row">
        <Radio name="radio-sizes-x-small" size="x-small" value="other">
          x-small
        </Radio>
        <Radio name="radio-sizes-small" size="small" value="other">
          Small
        </Radio>
        <Radio name="radio-sizes-default" value="other">
          Default
        </Radio>
        <Radio name="radio-sizes-large" size="large" value="other">
          Large
        </Radio>
      </div>
    </>
  )
}
