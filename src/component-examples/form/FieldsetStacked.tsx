import { Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form stacked>
      <TextField label="First name" placeholder="First" />
      <TextField label="Last name" placeholder="Last" />
    </Form>
  )
}
