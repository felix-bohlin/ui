import { Select } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Select disabled label="Plan">
        <option>Team</option>
        <option>Business</option>
      </Select>

      <Select disabled label="Billing cycle" variant="filled">
        <option>Yearly</option>
        <option>Monthly</option>
      </Select>
    </>
  )
}
