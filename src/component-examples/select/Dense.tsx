import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Fruit" dense>
      <option value="">-</option>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
    </Select>
  )
}
