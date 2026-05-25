import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Invalid" invalid>
        <option>Option</option>
      </Select>
      <Select label="Valid" valid>
        <option>Option</option>
      </Select>
    </>
  )
}
