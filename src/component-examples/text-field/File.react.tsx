import { TextField } from "opui-css/react"

export default function File() {
  return (
    <>
      <TextField type="file" placeholder="File" label="Label" />
      <TextField
        type="file"
        placeholder="File"
        label="Label"
        variant="filled"
      />
    </>
  )
}
