import { Select } from "opui-css/react"

export default function Grouped() {
  return (
    <Select label="Car">
      <option value="">Select car</option>
      <div role="group">
        <label className="ui-text">French cars</label>
        <option>Citroën</option>
        <option>Renault</option>
      </div>
      <div role="group">
        <label className="ui-text">Swedish cars</label>
        <option>Saab</option>
        <option>Volvo</option>
      </div>
    </Select>
  )
}
