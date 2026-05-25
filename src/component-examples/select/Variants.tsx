import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Label">
        <option value="">-</option>
        <option>Outlined (default)</option>
        <option>Option Two</option>
      </Select>
      <Select label="Label" variant="filled">
        <option value="">-</option>
        <option>Filled</option>
        <option>Option Two</option>
      </Select>
    </>
  )
}
