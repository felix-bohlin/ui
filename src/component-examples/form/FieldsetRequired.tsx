import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend required>Required fieldset</FieldLegend>
        <FieldGroup name="form-required">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
