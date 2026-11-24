/** @jsxImportSource @solidjs/web */
import { CharacterCount, Field } from "opui-css/solid"

export default function TopAndBottom() {
  return (
    <>
      <Field
        for="field-top-and-bottom-1"
        label="Name"
        top="Shown on your profile"
      >
        <input
          aria-describedby="field-top-and-bottom-1-top"
          id="field-top-and-bottom-1"
          placeholder="Holly Humbucker"
        />
      </Field>

      <Field
        bottom="Plain text, no links"
        endText={
          <>
            Up to 80 characters.
            <CharacterCount />
          </>
        }
        for="field-top-and-bottom-2"
        label="Bass motto"
      >
        <input
          aria-describedby="field-top-and-bottom-2-bottom field-top-and-bottom-2-end-text"
          id="field-top-and-bottom-2"
          maxlength="80"
          placeholder="Turn it up, not down"
        />
      </Field>
    </>
  )
}
