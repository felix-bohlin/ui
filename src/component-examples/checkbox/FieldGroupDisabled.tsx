import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled legend</FieldLegend>
        <FieldGroup name="checkbox-disabled">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
