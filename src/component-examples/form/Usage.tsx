import { Button, Form, TextField } from "opui-css/solid"

export default function Example() {
  return (
    <Form>
      <TextField label="Name" placeholder="Your name" />
      <TextField label="Email" type="email" placeholder="your@email.com" />
      <Button variant="filled" color="primary" type="submit">Submit</Button>
    </Form>
  )
}
