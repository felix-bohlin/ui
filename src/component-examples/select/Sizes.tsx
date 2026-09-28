import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Select label="Small" size="small">
        <option value="">Small</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </Select>
      <Select label="Default">
        <option value="">Default</option>
        <option>Option Two</option>
        <option>Option Three</option>
      </Select>
    </>
  )
}
