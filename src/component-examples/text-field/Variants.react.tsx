import { TextField } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <TextField htmlFor="text-field-variants-1" label="Outlined">
        <input id="text-field-variants-1" placeholder="Your name" />
      </TextField>
      <TextField
        htmlFor="text-field-variants-2"
        label="Filled"
        variant="filled"
      >
        <input id="text-field-variants-2" placeholder="Your name" />
      </TextField>
    </>
  )
}
