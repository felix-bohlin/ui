import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Category">
      <optgroup label="Group A">
        <option>Option 1</option>
        <option>Option 2</option>
      </optgroup>
      <optgroup label="Group B">
        <option>Option 3</option>
        <option>Option 4</option>
      </optgroup>
    </Select>
  )
}
