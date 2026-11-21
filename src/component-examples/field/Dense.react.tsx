import { Field, SelectButton } from "opui-css/react"

export default function Dense() {
  return (
    <Field dense htmlFor="field-dense-1" label="Fruit">
      <select id="field-dense-1">
        <SelectButton />
        <option value="">-</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Cherry</option>
      </select>
    </Field>
  )
}
