import { Select } from "opui-css/solid"

export default function Example() {
  return (
    <Select label="Car">
      <option value="">Select car</option>
      <div role="group">
        <label class="ui-text">French cars</label>
        <option>Citroën</option>
        <option>Renault</option>
      </div>
      <div role="group">
        <label class="ui-text">Swedish cars</label>
        <option>Saab</option>
        <option>Volvo</option>
      </div>
    </Select>
  )
}
