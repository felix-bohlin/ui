import { TextField } from "opui-css/react"

export default function CharacterCount() {
  return (
    <TextField
      characterCount
      endText="Up to 20 letters, numbers and dashes."
      label="Username"
      maxLength={20}
    />
  )
}
