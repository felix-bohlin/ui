import { TextField } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <TextField label="I'm required" placeholder="Placeholder" required />
        <TextField
          label="So am I!"
          placeholder="Placeholder"
          required
          variant="filled"
        />
      </div>

      <div className="example-row">
        <TextField
          label="Label"
          placeholder="Placeholder"
          defaultValue="This isn't right"
          endText="Only double-negatives are allowed."
          error
        />
        <TextField
          label="Label"
          placeholder="Placeholder"
          defaultValue="Uh-oh"
          endText="Only letters from the first half of the alphabet are allowed."
          error
          variant="filled"
        />
      </div>
    </>
  )
}
