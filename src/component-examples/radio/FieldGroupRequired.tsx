import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required</FieldLegend>
        <FieldGroup name="radio-required">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
