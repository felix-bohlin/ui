import { Select } from "opui-css/react"

export default function Validation() {
  return (
    <>
      <div className="example-row">
        <Select label="Country" required>
          <option value="">-</option>
          <option>Denmark</option>
          <option>Norway</option>
          <option>Sweden</option>
        </Select>
        <Select label="Country" required variant="filled">
          <option value="">-</option>
          <option>Denmark</option>
          <option>Norway</option>
          <option>Sweden</option>
        </Select>
      </div>

      <div className="example-row">
        <Select
          defaultValue="Norway"
          endText="We don't ship to Norway yet. Pick another country."
          error
          label="Shipping country"
        >
          <option value="">-</option>
          <option>Denmark</option>
          <option>Norway</option>
          <option>Sweden</option>
        </Select>
        <Select
          defaultValue="Norway"
          endText="We don't ship to Norway yet. Pick another country."
          error
          label="Shipping country"
          variant="filled"
        >
          <option value="">-</option>
          <option>Denmark</option>
          <option>Norway</option>
          <option>Sweden</option>
        </Select>
      </div>
    </>
  )
}
