import { Textarea } from "opui-css/react"

export default function CharacterCount() {
  return (
    <Textarea
      characterCount
      characterCountLabel="{count} characters to go"
      endText="Shown on your profile."
      label="Bio"
      maxLength={160}
    />
  )
}
