import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function Numeric() {
  return (
    <TextField>
      <TextFieldLabel>Numeric</TextFieldLabel>
      <TextFieldControl>
        <TextFieldInput placeholder="Numeric" type="numeric" />
      </TextFieldControl>
    </TextField>
  )
}
