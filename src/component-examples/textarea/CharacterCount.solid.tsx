/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function CharacterCount() {
  return (
    <Textarea
      characterCount
      characterCountLabel="{count} characters to go"
      endText="Shown on your profile."
      label="Bio"
      maxlength={160}
    />
  )
}
