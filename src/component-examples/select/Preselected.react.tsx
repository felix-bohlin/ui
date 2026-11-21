import { Field, SelectButton } from "opui-css/react"

export default function Preselected() {
  return (
    <>
      <Field htmlFor="select-preselected-1" label="Role">
        <select id="select-preselected-1" defaultValue="bass">
          <SelectButton />
          <option value="backing-vocals">Backing vocals</option>
          <option value="bass">Bass</option>
          <option value="tambourine">Tambourine</option>
        </select>
      </Field>

      <Field htmlFor="select-preselected-2" label="Band">
        <select id="select-preselected-2" defaultValue="low-end-theory">
          <SelectButton />
          <option value="brad-and-the-brads">Brad and the Brads</option>
          <option value="low-end-theory">Low End Theory</option>
          <option value="the-low-enders">The Low Enders</option>
        </select>
      </Field>
    </>
  )
}
