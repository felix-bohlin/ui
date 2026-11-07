import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function FieldGroupOrientation() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Seat</FieldLegend>
        <FieldGroup name="radio-group-orientation" orientation="horizontal">
          <Radio defaultChecked value="window">
            Window
          </Radio>
          <Radio value="middle">Middle</Radio>
          <Radio value="aisle">Aisle</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
