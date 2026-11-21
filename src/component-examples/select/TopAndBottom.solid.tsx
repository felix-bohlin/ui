/** @jsxImportSource @solidjs/web */
import { Select } from "opui-css/solid"

export default function TopAndBottom() {
  return (
    <Select
      bottom={
        <a class="ui-link" href="#">
          Manage cars…
        </a>
      }
      label="Car"
      top="Company cars only"
    >
      <option value="">-</option>
      <option>Kia EV6</option>
      <option>Volkswagen ID.4</option>
      <option>Volvo EX30</option>
    </Select>
  )
}
