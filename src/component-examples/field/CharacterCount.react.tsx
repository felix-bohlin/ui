import { CharacterCount, Field } from "opui-css/react"

export default function CharacterCountExample() {
  return (
    <Field
      endText={
        <>
          Up to 60 characters.
          <CharacterCount label="{count} characters left" />
        </>
      }
      htmlFor="field-character-count-1"
      label="Headline"
    >
      <input
        aria-describedby="field-character-count-1-end-text"
        id="field-character-count-1"
        maxLength={60}
        name="headline"
      />
    </Field>
  )
}
