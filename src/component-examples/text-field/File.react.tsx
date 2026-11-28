import { Field } from "opui-css/react"

export default function File() {
  return (
    <>
      <Field htmlFor="text-field-file-1" label="Avatar">
        <input accept="image/*" id="text-field-file-1" type="file" />
      </Field>
      <Field htmlFor="text-field-file-2" label="Attachments" variant="filled">
        <input id="text-field-file-2" type="file" />
      </Field>
    </>
  )
}
