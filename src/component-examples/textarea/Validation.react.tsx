import { Textarea } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Textarea label="Label" placeholder="Default" required />
        <Textarea
          label="Label"
          placeholder="Filled"
          required
          variant="filled"
        />
      </div>

      <div className="example-row">
        <Textarea
          defaultValue="This isn't right"
          endText="Only double-negatives are allowed."
          error
          label="Label"
          placeholder="Default"
        />
        <Textarea
          defaultValue="Uh-oh"
          endText="Only letters from the first half of the alphabet are allowed."
          error
          label="Label"
          placeholder="Filled"
          variant="filled"
        />
      </div>
    </>
  )
}
