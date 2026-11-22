import { Field, SelectButton } from "opui-css/react"

export default function Required() {
  return (
    <Field htmlFor="select-required-1" label="Shipping country">
      <select id="select-required-1" name="shipping-country" required>
        <SelectButton />
        <option value="">Choose a country</option>
        <option value="dk">Denmark</option>
        <option value="fi">Finland</option>
        <option value="no">Norway</option>
        <option value="se">Sweden</option>
      </select>
    </Field>
  )
}
