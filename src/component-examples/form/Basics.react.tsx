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
          <TextField htmlFor="form-basics-2" label="Name">
            <input autoComplete="name" id="form-basics-2" />
          </TextField>
          <TextField htmlFor="form-basics-3" label="Email">
            <input autoComplete="email" id="form-basics-3" type="email" />
          </TextField>
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
