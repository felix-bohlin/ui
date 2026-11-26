/** @jsxImportSource @solidjs/web */
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/solid"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="radio-field-group-validation-1-error">
        <FieldLegend>Color</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Radio
            defaultChecked
            error
            name="radio-group-validation"
            value="black"
          >
            Black
          </Radio>
          <Radio error name="radio-group-validation" value="white">
            White
          </Radio>
          <Radio error name="radio-group-validation" value="red">
            Red
          </Radio>
        </FieldGroup>
        <span class="ui-end-text" id="radio-field-group-validation-1-error">
          Black is sold out. Pick another color.
        </span>
      </Fieldset>
    </Form>
  )
}
