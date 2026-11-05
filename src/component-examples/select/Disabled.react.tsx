import { Select } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Select disabled label="Plan">
        <option>Business</option>
        <option>Enterprise</option>
      </Select>

      <Select disabled label="Billing cycle" variant="filled">
        <option>Yearly</option>
        <option>Monthly</option>
      </Select>
    </>
  )
}
