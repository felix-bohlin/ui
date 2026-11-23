/** @jsxImportSource @solidjs/web */
import { Field, SelectButton } from "opui-css/solid"

export default function Disabled() {
  return (
    <>
      <Field for="select-disabled-1" label="Plan">
        <select disabled id="select-disabled-1">
          <SelectButton />
          <option>Gold</option>
          <option>Platinum</option>
        </select>
      </Field>

      <Field for="select-disabled-2" label="Billing cycle" variant="filled">
        <select disabled id="select-disabled-2">
          <SelectButton />
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </Field>
    </>
  )
}
