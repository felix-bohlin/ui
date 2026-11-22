import { Field } from "opui-css/react"

export default function InputTypes() {
  return (
    <>
      <div className="example-column">
        <Field htmlFor="text-field-input-types-1" label="Color">
          <input id="text-field-input-types-1" type="color" />
        </Field>
        <Field htmlFor="text-field-input-types-2" label="Email">
          <input
            id="text-field-input-types-2"
            placeholder="name@example.com"
            type="email"
          />
        </Field>
        <Field htmlFor="text-field-input-types-3" label="Password">
          <input
            id="text-field-input-types-3"
            placeholder="Password"
            type="password"
          />
        </Field>
        <Field htmlFor="text-field-input-types-4" label="Search">
          <input
            id="text-field-input-types-4"
            placeholder="Search"
            type="search"
          />
        </Field>
        <Field htmlFor="text-field-input-types-5" label="Phone">
          <input
            id="text-field-input-types-5"
            placeholder="(555) 010-0100"
            type="tel"
          />
        </Field>
        <Field htmlFor="text-field-input-types-6" label="Text">
          <input id="text-field-input-types-6" placeholder="Text" type="text" />
        </Field>
        <Field htmlFor="text-field-input-types-7" label="URL">
          <input
            id="text-field-input-types-7"
            placeholder="https://example.com"
            type="url"
          />
        </Field>
      </div>

      <div className="example-column">
        <Field htmlFor="text-field-input-types-8" label="Date">
          <input id="text-field-input-types-8" type="date" />
        </Field>
        <Field htmlFor="text-field-input-types-9" label="Datetime local">
          <input id="text-field-input-types-9" type="datetime-local" />
        </Field>
        <Field htmlFor="text-field-input-types-10" label="Month">
          <input id="text-field-input-types-10" type="month" />
        </Field>
        <Field htmlFor="text-field-input-types-11" label="Time">
          <input id="text-field-input-types-11" type="time" />
        </Field>
        <Field htmlFor="text-field-input-types-12" label="Week">
          <input id="text-field-input-types-12" type="week" />
        </Field>
      </div>
    </>
  )
}
