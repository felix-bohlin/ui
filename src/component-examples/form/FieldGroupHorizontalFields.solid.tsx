/** @jsxImportSource @solidjs/web */
import { Button, FieldGroup, Form, TextField } from "opui-css/solid"

export default function FieldGroupHorizontalFields() {
  return (
    <Form>
      <FieldGroup orientation="horizontal">
        <TextField
          for="form-field-group-horizontal-fields-1"
          label="Discount code"
        >
          <input id="form-field-group-horizontal-fields-1" name="discount" />
        </TextField>
        <Button variant="outlined">Apply</Button>
      </FieldGroup>
    </Form>
  )
}
