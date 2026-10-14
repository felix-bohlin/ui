import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldsetInvalid() {
  return (
    <FieldSet>
      <FieldLegend>Pet food</FieldLegend>
      <FieldDescription>Pick at least one.</FieldDescription>
      <FieldGroup name="food">
        <Checkbox error value="kibble">
          Kibble
        </Checkbox>
        <Checkbox error value="wet-food">
          Wet food
        </Checkbox>
      </FieldGroup>
      <span className="ui-end-text">Your pet is hungry.</span>
    </FieldSet>
  )
}
