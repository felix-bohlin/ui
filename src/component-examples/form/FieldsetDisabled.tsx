import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <FieldSet disabled>
        <FieldLegend>Disabled fieldset</FieldLegend>
        <FieldGroup name="form-disabled">
          <Checkbox>Option A</Checkbox>
          <Checkbox>Option B</Checkbox>
        </FieldGroup>
      </FieldSet>
    </Form>
  )
}
