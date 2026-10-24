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
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup orientation="horizontal" name="checkbox-group-validation">
          <Checkbox defaultChecked error>
            Checkbox 1
          </Checkbox>
          <Checkbox error>Checkbox 2</Checkbox>
          <Checkbox error>Checkbox 3</Checkbox>
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
