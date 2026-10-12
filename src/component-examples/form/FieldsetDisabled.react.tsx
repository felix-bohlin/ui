import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldsetDisabled() {
  return (
    <FieldSet disabled>
      <FieldLegend>Pet dating</FieldLegend>
      <FieldDescription>You can't change these settings</FieldDescription>
      <FieldGroup name="notifications">
        <Checkbox>
          <CheckboxInput value="horse-tinder" defaultChecked />
          <CheckboxLabel>Horse Tinder</CheckboxLabel>
        </Checkbox>
        <Checkbox>
          <CheckboxInput value="onlyhorsefans" defaultChecked />
          <CheckboxLabel>OnlyHorseFans</CheckboxLabel>
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  )
}
