import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled</FieldLegend>
        <FieldGroup name="radio-disabled">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
