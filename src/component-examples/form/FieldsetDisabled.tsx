import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/solid"

export default function Example() {
  return (
    <FieldSet disabled>
      <FieldLegend>Pet dating</FieldLegend>
      <FieldDescription>You can't change these settings</FieldDescription>
      <FieldGroup name="notifications">
        <Checkbox value="horse-tinder" checked>
          Horse Tinder
        </Checkbox>
        <Checkbox value="onlyhorsefans" checked>
          OnlyHorseFans
        </Checkbox>
      </FieldGroup>
    </FieldSet>
  )
}
