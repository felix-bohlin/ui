import { Button, Field, FieldGroup, Form } from "opui-css/react"

export default function FieldGroupHorizontalFields() {
  return (
    <Form>
      <FieldGroup orientation="horizontal">
        <Field
          htmlFor="form-field-group-horizontal-fields-1"
          label="Discount code"
        >
          <input id="form-field-group-horizontal-fields-1" name="discount" />
        </Field>
        <Button variant="outlined">Apply</Button>
      </FieldGroup>
    </Form>
  )
}
