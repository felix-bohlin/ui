import { TextField } from "opui-css/solid"

export default function Example() {
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
          label="Label"
          placeholder="Placeholder"
          value="This isn't right"
          endText="Only double-negatives are allowed."
          error
        />
        <TextField
          label="Label"
          placeholder="Placeholder"
          value="Uh-oh"
          endText="Only letters from the first half of the alphabet are allowed."
          error
          variant="filled"
        />
      </div>
    </>
  )
}
