/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function CharacterCount() {
  return (
    <TextField
      characterCount
      endText="Up to 20 letters, numbers and dashes."
      for="text-field-character-count-1"
      label="Username"
    >
      <input
        aria-describedby="text-field-character-count-1-end-text"
        id="text-field-character-count-1"
        maxlength="20"
      />
    </TextField>
  )
}
