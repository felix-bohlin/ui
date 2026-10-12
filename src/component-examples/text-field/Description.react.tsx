import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
  TextFieldStartText,
} from "opui-css/react"

export default function Description() {
  return (
    <TextField>
      <TextFieldLabel>Name</TextFieldLabel>
      <TextFieldStartText>As it appears on your ID</TextFieldStartText>
      <TextFieldControl>
        <TextFieldInput />
      </TextFieldControl>
    </TextField>
  )
}
