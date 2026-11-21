import { TextField } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <TextField htmlFor="text-field-validation-1" label="Full name">
          <input
            id="text-field-validation-1"
            placeholder="Holly Humbucker"
            required
          />
        </TextField>
        <TextField
          htmlFor="text-field-validation-2"
          label="Email"
          variant="filled"
        >
          <input
            id="text-field-validation-2"
            placeholder="name@lowend.example"
            required
            type="email"
          />
        </TextField>
      </div>

      <div className="example-row">
        <TextField
          endText="Whoops, this username is taken. Try another one."
          htmlFor="text-field-validation-3"
          label="Username"
        >
          <input
            aria-describedby="text-field-validation-3-end-text"
            aria-invalid="true"
            id="text-field-validation-3"
            defaultValue="ada"
          />
        </TextField>
        <TextField
          endText="Bummer, this code has expired."
          htmlFor="text-field-validation-4"
          label="Gear discount code"
          variant="filled"
        >
          <input
            aria-describedby="text-field-validation-4-end-text"
            aria-invalid="true"
            id="text-field-validation-4"
            defaultValue="STRINGS23"
          />
        </TextField>
      </div>
    </>
  )
}
