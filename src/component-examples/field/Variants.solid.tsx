/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Field for="field-variants-1" label="Outlined">
        <input id="field-variants-1" placeholder="Your name" />
      </Field>
      <Field for="field-variants-2" label="Filled" variant="filled">
        <input id="field-variants-2" placeholder="Your name" />
      </Field>
    </>
  )
}
