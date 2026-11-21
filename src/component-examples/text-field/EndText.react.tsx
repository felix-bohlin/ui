import { TextField } from "opui-css/react"

export default function EndText() {
  return (
    <TextField
      endText="We never share your email."
      htmlFor="text-field-end-text-1"
      label="Email"
    >
      <input
        aria-describedby="text-field-end-text-1-end-text"
        id="text-field-end-text-1"
        placeholder="name@example.com"
        type="email"
      />
    </TextField>
  )
}
