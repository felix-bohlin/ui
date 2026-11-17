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
      <Fieldset aria-describedby="form-basics-1-description">
        <FieldLegend>Contact</FieldLegend>
        <FieldDescription id="form-basics-1-description">
          How can we reach you?
        </FieldDescription>
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
