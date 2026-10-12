import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <div className="example-row">
        <Checkbox size="x-small">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
        </Checkbox>
        <Checkbox size="small">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
        </Checkbox>
        <Checkbox size="large">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel visuallyHidden>Label</CheckboxLabel>
        </Checkbox>
      </div>
      <div className="example-row">
        <Checkbox size="x-small">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel>x-small</CheckboxLabel>
        </Checkbox>
        <Checkbox size="small">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel>Small</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel>Default</CheckboxLabel>
        </Checkbox>
        <Checkbox size="large">
          <CheckboxInput defaultChecked name="checkbox-sizes" />
          <CheckboxLabel>Large</CheckboxLabel>
        </Checkbox>
      </div>
    </>
  )
}
