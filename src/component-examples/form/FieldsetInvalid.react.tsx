import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldsetInvalid() {
  return (
    <FieldSet aria-describedby="form-fieldset-invalid-1-error">
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
      <span className="ui-end-text" id="form-fieldset-invalid-1-error">
        Your pet is hungry.
      </span>
    </FieldSet>
  )
}
