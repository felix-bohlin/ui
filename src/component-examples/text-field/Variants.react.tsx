import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function Variants() {
  return (
    <>
      <TextField>
        <TextFieldLabel>Outlined</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput placeholder="Placeholder" />
        </TextFieldControl>
      </TextField>
      <TextField variant="filled">
        <TextFieldLabel>Filled</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput placeholder="Placeholder" />
        </TextFieldControl>
      </TextField>
    </>
  )
}
