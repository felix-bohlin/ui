import { Select } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <Select hideLabel label="Sort by">
      <option>Newest first</option>
      <option>Oldest first</option>
      <option>Price, low to high</option>
      <option>Price, high to low</option>
    </Select>
  )
}
