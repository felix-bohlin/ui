import { TextField } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Hakki Hälinen"
        top="Shown on your profile"
      />

      <TextField
        bottom="Plain text, no links"
        characterCount
        label="Tagline"
        maxLength={80}
        placeholder="A short description"
      />
    </>
  )
}
