import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend text</FieldLegend>
        <FieldGroup name="form-legend">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
