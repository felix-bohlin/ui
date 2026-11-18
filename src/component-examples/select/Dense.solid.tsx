/** @jsxImportSource @solidjs/web */
import { Select } from "opui-css/solid"

export default function Dense() {
  return (
    <Select dense label="Fruit">
      <option value="">-</option>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
    </Select>
  )
}
