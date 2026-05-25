import { FieldDescription, FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldDescription>Pick the best option for you.</FieldDescription>
        <FieldGroup name="radio-desc">
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
