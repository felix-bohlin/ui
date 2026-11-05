/** @jsxImportSource @solidjs/web */
import { Select } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Select endText="Shown on your profile." label="Role">
        <option value="">-</option>
        <option>Designer</option>
        <option>Developer</option>
        <option>Manager</option>
      </Select>

      <Select
        endText="Your team lead approves requests."
        label="Team"
        variant="filled"
      >
        <option value="">-</option>
        <option>Design</option>
        <option>Engineering</option>
        <option>Sales</option>
      </Select>
    </>
  )
}
