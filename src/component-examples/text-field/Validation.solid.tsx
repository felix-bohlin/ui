/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <TextField label="Full name" placeholder="Holly Humbucker" required />
        <TextField
          label="Email"
          placeholder="name@lowend.example"
          required
          type="email"
          variant="filled"
        />
      </div>

      <div class="example-row">
        <TextField
          defaultValue="ada"
          endText="Whoops, this username is taken. Try another one."
          error
          label="Username"
        />
        <TextField
          defaultValue="STRINGS23"
          endText="Bummer, this code has expired."
          error
          label="Gear discount code"
          variant="filled"
        />
      </div>
    </>
  )
}
