import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Options</FieldLegend>
        <FieldGroup direction="horizontal" name="form-field-group-row">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
          <Checkbox>Option C</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
