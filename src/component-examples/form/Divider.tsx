import { Divider, Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <TextField label="Email" type="email" />
      <Divider />
      <TextField label="Password" type="password" />
    </Form>
  )
}
