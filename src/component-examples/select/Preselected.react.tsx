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
        <select id="select-preselected-2" defaultValue="bassists-anonymous">
          <SelectButton />
          <option value="bassists-anonymous">Bassists Anonymous</option>
          <option value="brad-and-the-brads">Brad and the Brads</option>
          <option value="slap-like-now">Slap Like Now</option>
        </select>
      </Field>
    </>
  )
}
