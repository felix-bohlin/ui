import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="radio-h">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
          <Radio value="c">Option C</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
