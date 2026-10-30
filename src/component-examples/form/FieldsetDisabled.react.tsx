import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/react"

export default function FieldsetDisabled() {
  return (
    <Fieldset disabled>
      <FieldLegend>Pet dating</FieldLegend>
      <FieldDescription>You can't change these settings</FieldDescription>
      <FieldGroup name="notifications">
        <Checkbox defaultChecked value="horse-tinder">
          Horse Tinder
        </Checkbox>
        <Checkbox defaultChecked value="onlyhorsefans">
          OnlyHorseFans
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  )
}
