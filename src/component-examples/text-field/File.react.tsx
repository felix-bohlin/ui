import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function File() {
  return (
    <>
      <TextField>
        <TextFieldLabel>Label</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput type="file" placeholder="File" />
        </TextFieldControl>
      </TextField>
      <TextField variant="filled">
        <TextFieldLabel>Label</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput type="file" placeholder="File" />
        </TextFieldControl>
      </TextField>
    </>
  )
}
