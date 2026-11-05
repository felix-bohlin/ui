import { TextField } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <TextField label="Full name" placeholder="Ada Lovelace" required />
        <TextField
          label="Email"
          placeholder="name@example.com"
          required
          type="email"
          variant="filled"
        />
      </div>

      <div className="example-row">
        <TextField
          defaultValue="ada"
          endText="This username is taken. Try another one."
          error
          label="Username"
        />
        <TextField
          defaultValue="SPRING23"
          endText="This code has expired."
          error
          label="Discount code"
          variant="filled"
        />
      </div>
    </>
  )
}
