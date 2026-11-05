/** @jsxImportSource @solidjs/web */
import { TextField } from "opui-css/solid"

export default function Validation() {
  return (
    <>
      <div class="example-row">
        <TextField label="I'm required" placeholder="Placeholder" required />
        <TextField
          label="So am I!"
          placeholder="Placeholder"
          required
          variant="filled"
        />
      </div>

      <div class="example-row">
        <TextField
          endText="Only double-negatives are allowed."
          error
          label="Label"
          placeholder="Placeholder"
          value="This isn't right"
        />
        <TextField
          endText="Only letters from the first half of the alphabet are allowed."
          error
          label="Label"
          placeholder="Placeholder"
          value="Uh-oh"
          variant="filled"
        />
      </div>
    </>
  )
}
