import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupFieldDescription() {
  return (
    <Form>
      <Fieldset aria-describedby="radio-field-group-field-description-1-description">
        <FieldLegend>Contact method</FieldLegend>
        <FieldDescription id="radio-field-group-field-description-1-description">
          We only contact you about your order.
        </FieldDescription>
        <FieldGroup orientation="horizontal">
          <Radio
            defaultChecked
            name="radio-group-field-description-1"
            value="email"
          >
            Email
          </Radio>
          <Radio name="radio-group-field-description-1" value="phone">
            Phone
          </Radio>
          <Radio name="radio-group-field-description-1" value="sms">
            SMS
          </Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset aria-describedby="radio-field-group-field-description-2-description">
        <FieldLegend>Theme</FieldLegend>
        <FieldGroup orientation="horizontal">
          <Radio
            defaultChecked
            name="radio-group-field-description-2"
            value="system"
          >
            System
          </Radio>
          <Radio name="radio-group-field-description-2" value="light">
            Light
          </Radio>
          <Radio name="radio-group-field-description-2" value="dark">
            Dark
          </Radio>
        </FieldGroup>
        <FieldDescription id="radio-field-group-field-description-2-description">
          System follows your device setting.
        </FieldDescription>
      </Fieldset>
    </Form>
  )
}
