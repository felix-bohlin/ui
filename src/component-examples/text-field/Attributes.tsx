import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField
      label="Email"
      type="email"
      required
      data-testid="email"
      placeholder="name@example.com"
    />
  )
}
