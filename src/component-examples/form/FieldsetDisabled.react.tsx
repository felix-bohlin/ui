import {
  Checkbox,
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
        <Checkbox value="horse-tinder" defaultChecked>
          Horse Tinder
        </Checkbox>
        <Checkbox value="onlyhorsefans" defaultChecked>
          OnlyHorseFans
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  )
}
