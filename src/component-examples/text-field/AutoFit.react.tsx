import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function AutoFit() {
  return (
    <TextField autoFit>
      <TextFieldLabel>Label</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Auto-fit" />
      </TextFieldControl>
    </TextField>
  )
}
