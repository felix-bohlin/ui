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
        <Checkbox value="horse-tinder" defaultChecked>
          Horse Tinder
        </Checkbox>
        <Checkbox value="onlyhorsefans" defaultChecked>
          OnlyHorseFans
        </Checkbox>
      </FieldGroup>
    </Fieldset>
  )
}
