import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/react"

export default function FieldGroupDirection() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup direction="row" name="radio-group-direction">
          <Radio value="1" defaultChecked>
            Radio 1
          </Radio>
          <Radio value="2">Radio 2</Radio>
          <Radio value="3">Radio 3</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
