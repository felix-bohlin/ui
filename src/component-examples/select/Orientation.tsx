import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Vertical (default)">
        <option>Option</option>
      </Select>
      <Select label="Horizontal" orientation="horizontal">
        <option>Option</option>
      </Select>
    </>
  )
}
