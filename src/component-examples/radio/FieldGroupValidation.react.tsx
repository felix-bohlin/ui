import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupValidation() {
  return (
    <Form>
      <Fieldset aria-describedby="radio-field-group-validation-1-error">
        <FieldLegend>Color</FieldLegend>
        <FieldGroup name="radio-group-validation" orientation="horizontal">
          <Radio defaultChecked error value="black">
            Black
          </Radio>
          <Radio error value="white">
            White
          </Radio>
          <Radio error value="red">
            Red
          </Radio>
        </FieldGroup>
        <span className="ui-end-text" id="radio-field-group-validation-1-error">
          Black is sold out. Pick another color.
        </span>
      </Fieldset>
    </Form>
  )
}
