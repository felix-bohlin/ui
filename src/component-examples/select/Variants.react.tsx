import { Select } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Select label="Role">
        <option value="">-</option>
        <option>Backing vocals</option>
        <option>Bass</option>
        <option>Tambourine</option>
      </Select>

      <Select label="Band" variant="filled">
        <option value="">-</option>
        <option>Brad and the Brads</option>
        <option>Low End Theory</option>
        <option>The Low Enders</option>
      </Select>
    </>
  )
}
