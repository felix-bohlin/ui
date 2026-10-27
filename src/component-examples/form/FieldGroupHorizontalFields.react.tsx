import { Button, FieldGroup, Form, TextField } from "opui-css/react"

export default function FieldGroupHorizontalFields() {
  return (
    <Form>
      <FieldGroup orientation="horizontal">
        <TextField label="Discount code" name="discount" />
        <Button variant="outlined">Apply</Button>
      </FieldGroup>
    </Form>
  )
}
