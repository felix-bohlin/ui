import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Horizontal</FieldLegend>
        <FieldGroup direction="horizontal" name="checkbox-h">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
          <Checkbox>Option 3</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
