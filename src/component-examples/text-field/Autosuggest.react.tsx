import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "opui-css/react"

export default function Autosuggest() {
  return (
    <>
      <TextField>
        <TextFieldLabel>Users</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput list="users" placeholder="Placeholder" />
        </TextFieldControl>
        <datalist id="users">
          <option value="Ray Manzarek"></option>
          <option value="Jonny Greenwood"></option>
          <option value="Marika Hackman"></option>
        </datalist>
      </TextField>

      <TextField variant="filled">
        <TextFieldLabel>Emails</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput
            list="users-email"
            placeholder="Placeholder"
            type="email"
          />
        </TextFieldControl>
        <datalist id="users-email">
          <option value="ray.manzarek@the.doors"></option>
          <option value="jonny.greenwood@radio.head"></option>
          <option value="marika@hack.man"></option>
        </datalist>
      </TextField>
    </>
  )
}
