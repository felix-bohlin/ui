import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Small" size="small">
        <option>Option</option>
      </Select>
      <Select label="Default">
        <option>Option</option>
      </Select>
      <Select label="Large" size="large">
        <option>Option</option>
      </Select>
    </>
  )
}
