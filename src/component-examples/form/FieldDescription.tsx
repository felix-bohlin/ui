import { Checkbox, FieldDescription, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Legend</FieldLegend>
        <FieldDescription>Description of the field group.</FieldDescription>
        <FieldGroup name="form-desc">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
