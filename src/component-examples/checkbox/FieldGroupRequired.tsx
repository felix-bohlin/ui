import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required legend</FieldLegend>
        <FieldGroup name="checkbox-required">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
