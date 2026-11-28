/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function Dense() {
  return (
    <Field dense for="field-dense-1" label="Fruit">
      <select id="field-dense-1">
        <SelectButton />
        <option value="">Pick a fruit</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Cherry</option>
      </select>
    </Field>
  )
}
