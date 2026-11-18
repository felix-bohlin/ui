/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function CharacterCount() {
  return (
    <TextField
      characterCount
      endText="Up to 20 letters, numbers and dashes."
      label="Username"
      maxlength={20}
    />
  )
}
