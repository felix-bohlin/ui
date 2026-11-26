/** @jsxImportSource @solidjs/web */
import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="checkbox-field-group-validation-1-error">
        <FieldLegend>Bass interests</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Checkbox defaultChecked error name="checkbox-group-validation">
            Slap
          </Checkbox>
          <Checkbox error name="checkbox-group-validation">
            Fretless
          </Checkbox>
          <Checkbox error name="checkbox-group-validation">
            Drop D
          </Checkbox>
        </FieldGroup>
        <span class="ui-end-text" id="checkbox-field-group-validation-1-error">
          Pick at least two to continue.
        </span>
      </Fieldset>
    </Form>
  )
}
