import { Button, FieldGroup, Form, Range } from "opui-css/react"

export default function Value() {
  return (
    <Form>
      <Range label="Hue" min="0" max="360" defaultValue="250" valueSuffix="°" />
      <FieldGroup>
        <Button type="reset">Reset</Button>
      </FieldGroup>
    </Form>
  )
}
