import { Field } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Field htmlFor="field-validation-1" label="Full name">
          <input
            id="field-validation-1"
            placeholder="Holly Humbucker"
            required
          />
        </Field>
        <Field htmlFor="field-validation-2" label="Email" variant="filled">
          <input
            id="field-validation-2"
            placeholder="name@bassmail.example"
            required
            type="email"
          />
        </Field>
      </div>

      <div className="example-row">
        <Field
          endText="Whoops, this username is taken. Try another one."
          htmlFor="field-validation-3"
          label="Username"
        >
          <input
            aria-describedby="field-validation-3-end-text"
            aria-invalid="true"
            id="field-validation-3"
            defaultValue="ada"
          />
        </Field>
        <Field
          endText="Bummer, this code has expired."
          htmlFor="field-validation-4"
          label="Gear discount code"
          variant="filled"
        >
          <input
            aria-describedby="field-validation-4-end-text"
            aria-invalid="true"
            id="field-validation-4"
            defaultValue="STRINGS23"
          />
        </Field>
      </div>
    </>
  )
}
