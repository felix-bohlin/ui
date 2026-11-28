/** @jsxImportSource @solidjs/web */
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/solid"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Payment method</FieldLegend>
        <FieldGroup>
          <Radio defaultChecked name="radio-group" value="card">
            Card
          </Radio>
          <Radio name="radio-group" value="paypal">
            PayPal
          </Radio>
          <Radio name="radio-group" value="bank-transfer">
            Bank transfer
          </Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
