import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="Invalid" invalid validationMessage="This field is required" />
      <TextField label="Valid" valid />
    </>
  )
}
