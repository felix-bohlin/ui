import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Invalid</FieldLegend>
        <FieldGroup name="radio-invalid">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
