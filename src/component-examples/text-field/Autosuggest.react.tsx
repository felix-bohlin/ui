import { TextField } from "opui-css/react"

export default function Autosuggest() {
  return (
    <>
      <TextField
        label="Users"
        list="text-field-autosuggest-1-list"
        placeholder="Placeholder"
      >
        <datalist id="text-field-autosuggest-1-list">
          <option value="Ray Manzarek"></option>
          <option value="Jonny Greenwood"></option>
          <option value="Marika Hackman"></option>
        </datalist>
      </TextField>

      <TextField
        variant="filled"
        label="Emails"
        list="text-field-autosuggest-2-list"
        placeholder="Placeholder"
        type="email"
      >
        <datalist id="text-field-autosuggest-2-list">
          <option value="ray.manzarek@the.doors"></option>
          <option value="jonny.greenwood@radio.head"></option>
          <option value="marika@hack.man"></option>
        </datalist>
      </TextField>
    </>
  )
}
