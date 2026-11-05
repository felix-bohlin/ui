/** @jsxImportSource @solidjs/web */
import { Button, FieldGroup, Form, Range } from "opui-css/solid"

export default function Value() {
  return (
    <Form>
      <Range label="Hue" max="360" min="0" value="250" valueSuffix="°" />
      <FieldGroup>
        <Button type="reset">Reset</Button>
      </FieldGroup>
    </Form>
  )
}
