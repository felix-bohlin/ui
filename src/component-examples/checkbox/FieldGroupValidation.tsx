import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet invalid>
        <FieldLegend>Legend</FieldLegend>
        <FieldGroup name="checkbox-invalid">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
