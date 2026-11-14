import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  SelectAll,
} from "opui-css/react"

export default function Indeterminate() {
  return (
    <SelectAll>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup>
          <Checkbox data-select-all="">All notifications</Checkbox>
          <Checkbox defaultChecked name="checkbox-indeterminate" value="email">
            Email
          </Checkbox>
          <Checkbox name="checkbox-indeterminate" value="push">
            Push
          </Checkbox>
          <Checkbox name="checkbox-indeterminate" value="sms">
            SMS
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </SelectAll>
  )
}
