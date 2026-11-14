import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="checkbox-field-group-validation-1-error">
        <FieldLegend>Bass interests</FieldLegend>
        <FieldGroup name="checkbox-group-validation" orientation="horizontal">
          <Checkbox defaultChecked error>
            Slap
          </Checkbox>
          <Checkbox error>Fretless</Checkbox>
          <Checkbox error>Drop D</Checkbox>
        </FieldGroup>
        <span
          className="ui-end-text"
          id="checkbox-field-group-validation-1-error"
        >
          Pick at least two to continue.
        </span>
      </Fieldset>
    </Form>
  )
}
