import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Checkbox>
        <CheckboxInput defaultChecked name="checkbox-variants" />
        <CheckboxLabel visuallyHidden>Checked</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput name="checkbox-variants" />
        <CheckboxLabel visuallyHidden>Unchecked</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput indeterminate name="checkbox-variants" />
        <CheckboxLabel visuallyHidden>Indeterminate</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput disabled name="checkbox-variants" />
        <CheckboxLabel visuallyHidden>Disabled</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput defaultChecked disabled name="checkbox-variants" />
        <CheckboxLabel visuallyHidden>Checked and disabled</CheckboxLabel>
      </Checkbox>
    </>
  )
}
