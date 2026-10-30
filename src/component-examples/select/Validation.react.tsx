import { Select } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Select label="Label" required>
          <option value="">-</option>
          <option>Pick me!</option>
          <option>No me!!</option>
          <option>Come on!</option>
        </Select>

        <Select label="Label" required variant="filled">
          <option value="">-</option>
          <option>Pick me!</option>
          <option>No me!!</option>
          <option>Come on!</option>
        </Select>
      </div>

      <div className="example-row">
        <Select
          defaultValue="Wrong option"
          endText="Pick another option."
          error
          label="Label"
        >
          <option value="">-</option>
          <option>Wrong option</option>
          <option>Also wrong!</option>
          <option>Nothing's right!</option>
        </Select>

        <Select
          defaultValue="Wrong option"
          endText="Pick another option."
          error
          label="Label"
          variant="filled"
        >
          <option value="">-</option>
          <option>Wrong option</option>
          <option>Also wrong!</option>
          <option>Nothing's right!</option>
        </Select>
      </div>
    </>
  )
}
