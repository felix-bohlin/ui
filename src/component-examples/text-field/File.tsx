import { TextField } from "opui-css/solid"

export default function Example() {
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
