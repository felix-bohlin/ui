/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function TopAndBottom() {
  return (
    <>
      <TextField
        for="text-field-top-and-bottom-1"
        label="Name"
        top="Shown on your profile"
      >
        <input
          aria-describedby="text-field-top-and-bottom-1-top"
          id="text-field-top-and-bottom-1"
          placeholder="Holly Humbucker"
        />
      </TextField>

      <TextField
        bottom="Plain text, no links"
        characterCount
        for="text-field-top-and-bottom-2"
        label="Bass motto"
      >
        <input
          aria-describedby="text-field-top-and-bottom-2-bottom text-field-top-and-bottom-2-end-text"
          id="text-field-top-and-bottom-2"
          maxlength="80"
          placeholder="Turn it up, not down"
        />
      </TextField>
    </>
  )
}
