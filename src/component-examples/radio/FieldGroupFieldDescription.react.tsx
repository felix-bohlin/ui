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
      <Fieldset>
        <FieldLegend>Contact method</FieldLegend>
        <FieldDescription>
          We only contact you about your order.
        </FieldDescription>
        <FieldGroup
          name="radio-group-field-description-1"
          orientation="horizontal"
        >
          <Radio defaultChecked value="email">
            Email
          </Radio>
          <Radio value="phone">Phone</Radio>
          <Radio value="sms">SMS</Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset>
        <FieldLegend>Theme</FieldLegend>
        <FieldGroup
          name="radio-group-field-description-2"
          orientation="horizontal"
        >
          <Radio defaultChecked value="system">
            System
          </Radio>
          <Radio value="light">Light</Radio>
          <Radio value="dark">Dark</Radio>
        </FieldGroup>
        <FieldDescription>System follows your device setting.</FieldDescription>
      </Fieldset>
    </Form>
  )
}
