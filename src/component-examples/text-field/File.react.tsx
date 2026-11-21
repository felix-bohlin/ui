import { TextField } from "opui-css/react"

export default function File() {
  return (
    <>
      <TextField htmlFor="text-field-file-1" label="Avatar">
        <input accept="image/*" id="text-field-file-1" type="file" />
      </TextField>
      <TextField
        htmlFor="text-field-file-2"
        label="Attachments"
        variant="filled"
      >
        <input id="text-field-file-2" type="file" />
      </TextField>
    </>
  )
}
