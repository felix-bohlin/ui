import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="radio-group">
          <Radio defaultChecked value="1">
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}
