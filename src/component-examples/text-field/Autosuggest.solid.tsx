/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Autosuggest() {
  return (
    <>
      <TextField for="text-field-autosuggest-1" label="Bassists">
        <input
          id="text-field-autosuggest-1"
          list="text-field-autosuggest-1-list"
          placeholder="Search bassists"
        />
        <datalist id="text-field-autosuggest-1-list">
          <option value="Ines Hertz"></option>
          <option value="Lou Headstock"></option>
          <option value="Percy Groove"></option>
        </datalist>
      </TextField>

      <TextField for="text-field-autosuggest-2" label="Emails" variant="filled">
        <input
          id="text-field-autosuggest-2"
          list="text-field-autosuggest-2-list"
          placeholder="name@lowend.example"
          type="email"
        />
        <datalist id="text-field-autosuggest-2-list">
          <option value="ines@lowend.example"></option>
          <option value="lou@lowend.example"></option>
          <option value="percy@lowend.example"></option>
        </datalist>
      </TextField>
    </>
  )
}
