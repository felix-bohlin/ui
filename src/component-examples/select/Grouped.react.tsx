import { Select } from "opui-css/react"

export default function Grouped() {
  return (
    <Select id="select-grouped-1" label="Car">
      <option value="">Select car</option>
      <div aria-labelledby="select-grouped-1-french" role="group">
        <label className="ui-text" id="select-grouped-1-french">
          French cars
        </label>
        <option>Citroën</option>
        <option>Renault</option>
      </div>
      <div aria-labelledby="select-grouped-1-swedish" role="group">
        <label className="ui-text" id="select-grouped-1-swedish">
          Swedish cars
        </label>
        <option>Saab</option>
        <option>Volvo</option>
      </div>
    </Select>
  )
}
