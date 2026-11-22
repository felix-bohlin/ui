import {
  Button,
  Divider,
  Field,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function DividerExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Post content</FieldLegend>
        <FieldGroup>
          <Field htmlFor="form-divider-1" label="Title">
            <input id="form-divider-1" placeholder="My new post" />
          </Field>
        </FieldGroup>
      </Fieldset>
      <Divider />
      <FieldGroup>
        <Button>Save draft</Button>
        <Button variant="filled">Publish</Button>
      </FieldGroup>
    </Form>
  )
}
