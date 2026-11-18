import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/react"

export default function FieldsetInvalid() {
  return (
    <Fieldset aria-describedby="form-fieldset-invalid-1-description form-fieldset-invalid-1-error">
      <FieldLegend>Pet food</FieldLegend>
      <FieldDescription id="form-fieldset-invalid-1-description">
        Pick at least one.
      </FieldDescription>
      <FieldGroup name="food">
        <Checkbox error value="kibble">
          Kibble
        </Checkbox>
        <Checkbox error value="wet-food">
          Wet food
        </Checkbox>
      </FieldGroup>
      <span className="ui-end-text" id="form-fieldset-invalid-1-error">
        Choose at least one food.
      </span>
    </Fieldset>
  )
}
