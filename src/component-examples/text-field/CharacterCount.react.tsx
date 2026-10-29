import { TextField } from "opui-css/react"

export default function CharacterCount() {
  return (
    <TextField
      characterCount
      endText="Letters, numbers and dashes."
      label="Username"
      maxLength={20}
    />
  )
}
