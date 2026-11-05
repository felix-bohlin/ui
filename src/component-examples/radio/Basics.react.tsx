import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Payment method</FieldLegend>
        <FieldGroup name="radio-group">
          <Radio defaultChecked value="card">
            Card
          </Radio>
          <Radio value="paypal">PayPal</Radio>
          <Radio value="bank-transfer">Bank transfer</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
