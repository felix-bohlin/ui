import {
  Button,
  Divider,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function DividerExample() {
  return (
    <Form>
      <FieldSet>
        <FieldLegend>Post Content</FieldLegend>
        <FieldGroup>
          <TextField>
            <TextFieldLabel>Title</TextFieldLabel>
            <TextFieldControl>
              <TextFieldInput placeholder="My new post" />
            </TextFieldControl>
          </TextField>
        </FieldGroup>
      </FieldSet>

      <Divider />

      <FieldGroup>
        <Button>Save draft</Button>
        <Button variant="filled">Publish</Button>
      </FieldGroup>
    </Form>
  )
}
