import { Select } from "opui-css/react"

export default function HeaderFooter() {
  return (
    <Select
      label="Car"
      header="Company cars only"
      footer={
        <a className="ui-link" href="#">
          Manage cars…
        </a>
      }
    >
      <option value="">-</option>
      <option>Kia EV6</option>
      <option>Volkswagen ID.4</option>
      <option>Volvo EX30</option>
    </Select>
  )
}
