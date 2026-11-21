/** @jsxImportSource @solidjs/web */
import { CharacterCount, Field } from "opui-css/solid"

export default function CharacterCountExample() {
  return (
    <Field
      endText={
        <>
          Up to 160 characters, shown on your profile.
          <CharacterCount label="{count} characters to go" />
        </>
      }
      for="textarea-character-count-1"
      label="Bio"
    >
      <textarea
        aria-describedby="textarea-character-count-1-end-text"
        id="textarea-character-count-1"
        maxlength="160"
      ></textarea>
    </Field>
  )
}
