import { Button, ColorField, FieldGroup, Form } from "opui-css/react"

export default function FormValue() {
  return (
    <Form>
      <ColorField
        defaultValue="oklch(0.6 0.15 250)"
        id="color-field-form-value-1"
        label="Brand color"
        name="brand"
      />
      <FieldGroup>
        <Button type="reset">Reset</Button>
      </FieldGroup>
    </Form>
  )
}
