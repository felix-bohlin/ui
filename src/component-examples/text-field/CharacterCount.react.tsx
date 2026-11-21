import { TextField } from "opui-css/react"

export default function CharacterCount() {
  return (
    <TextField
      characterCount
      endText="Up to 20 letters, numbers and dashes."
      htmlFor="text-field-character-count-1"
      label="Username"
    >
      <input
        aria-describedby="text-field-character-count-1-end-text"
        id="text-field-character-count-1"
        maxLength={20}
      />
    </TextField>
  )
}
