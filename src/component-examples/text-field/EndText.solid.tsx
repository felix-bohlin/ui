/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function EndText() {
  return (
    <TextField
      endText="We never share your email."
      label="Email"
      placeholder="name@example.com"
      type="email"
    />
  )
}
