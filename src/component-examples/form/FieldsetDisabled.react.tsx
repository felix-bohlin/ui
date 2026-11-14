import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/react"

export default function FieldsetDisabled() {
  return (
    <Fieldset aria-describedby="form-fieldset-disabled-1-description" disabled>
      <FieldLegend>Security alerts</FieldLegend>
      <FieldDescription id="form-fieldset-disabled-1-description">
        Your administrator manages these settings.
      </FieldDescription>
      <FieldGroup name="alerts">
        <Checkbox defaultChecked value="email">
          Email
        </Checkbox>
        <Checkbox defaultChecked value="sms">
          SMS
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  )
}
