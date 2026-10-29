import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/react"

export default function DividerExample() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Post Content</FieldLegend>
        <FieldGroup>
          <TextField label="Title" placeholder="My new post" />
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
