/** @jsxImportSource @solidjs/web */
import { Button, Field, FieldGroup, Form } from "opui-css/solid"

export default function FieldGroupHorizontalFields() {
  return (
    <Form>
      <FieldGroup orientation="horizontal">
        <Field for="form-field-group-horizontal-fields-1" label="Discount code">
          <input id="form-field-group-horizontal-fields-1" name="discount" />
        </Field>
        <Button variant="outlined">Apply</Button>
      </FieldGroup>
    </Form>
  )
}
