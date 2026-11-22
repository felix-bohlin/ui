/** @jsxImportSource @solidjs/web */
import { CharacterCount, Field } from "opui-css/solid"

export default function CharacterCountExample() {
  return (
    <Field
      endText={
        <>
          Up to 60 characters.
          <CharacterCount label="{count} characters left" />
        </>
      }
      for="field-character-count-1"
      label="Headline"
    >
      <input
        aria-describedby="field-character-count-1-end-text"
        id="field-character-count-1"
        maxlength="60"
        name="headline"
      />
    </Field>
  )
}
