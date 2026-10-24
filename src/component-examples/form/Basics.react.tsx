import {
  Button,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Contact</FieldLegend>
        <FieldDescription>How can we reach you?</FieldDescription>
        <FieldGroup>
          <TextField autoComplete="name" label="Name" />
          <TextField autoComplete="email" label="Email" type="email" />
        </FieldGroup>
      </Fieldset>
      <FieldGroup>
        <Button type="submit" variant="filled">
          Send
        </Button>
      </FieldGroup>
    </Form>
  )
}
