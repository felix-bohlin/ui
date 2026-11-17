import { Select } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Select disabled label="Plan">
        <option>Gold</option>
        <option>Platinum</option>
      </Select>

      <Select disabled label="Billing cycle" variant="filled">
        <option>Yearly</option>
        <option>Monthly</option>
      </Select>
    </>
  )
}
