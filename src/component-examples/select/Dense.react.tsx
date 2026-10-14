import { Select } from "opui-css/react"

export default function Dense() {
  return (
    <Select label="Fruit" dense>
      <option value="">-</option>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
    </Select>
  )
}
