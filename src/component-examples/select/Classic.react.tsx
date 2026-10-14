import { ClassicSelect } from "opui-css/react"

export default function Classic() {
  return (
    <>
      <ClassicSelect label="Label">
        <option value="">-</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </ClassicSelect>

      <ClassicSelect label="Label" variant="filled">
        <option value="">-</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </ClassicSelect>
    </>
  )
}
