import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Supporting description for the group.</FieldDescription>
        <FieldGroup name="checkbox-desc">
          <Checkbox>Option 1</Checkbox>
          <Checkbox>Option 2</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
