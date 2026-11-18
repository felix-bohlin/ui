import { Textarea } from "opui-css/react"

export default function CharacterCount() {
  return (
    <Textarea
      characterCount
      characterCountLabel="{count} characters to go"
      endText="Up to 160 characters, shown on your profile."
      label="Bio"
      maxLength={160}
    />
  )
}
