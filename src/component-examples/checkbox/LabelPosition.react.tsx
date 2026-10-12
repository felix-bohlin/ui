import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/react"

export default function LabelPosition() {
  return (
    <>
      <Checkbox>
        <CheckboxInput name="checkbox-label-position" />
        <CheckboxLabel>Default</CheckboxLabel>
      </Checkbox>
      <Checkbox stack>
        <CheckboxInput name="checkbox-label-position" />
        <CheckboxLabel>Stack</CheckboxLabel>
      </Checkbox>
    </>
  )
}
