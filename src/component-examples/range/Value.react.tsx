import { Button, FieldGroup, Form, Range } from "opui-css/react"

export default function Value() {
  return (
    <Form>
      <Range defaultValue="250" label="Hue" max="360" min="0" valueSuffix="°" />
      <FieldGroup>
        <Button type="reset">Reset</Button>
      </FieldGroup>
    </Form>
  )
}
