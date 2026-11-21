import { Textarea } from "opui-css/react"

export default function CharacterCount() {
  return (
    <Textarea
      characterCount
      characterCountLabel="{count} characters to go"
      endText="Up to 160 characters, shown on your profile."
      htmlFor="textarea-character-count-1"
      label="Bio"
    >
      <textarea
        aria-describedby="textarea-character-count-1-end-text"
        id="textarea-character-count-1"
        maxLength={160}
      ></textarea>
    </Textarea>
  )
}
