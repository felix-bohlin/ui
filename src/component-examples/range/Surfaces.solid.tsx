/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Surfaces() {
  return (
    <>
      <Field for="range-surfaces-1" label="Volume">
        <input id="range-surfaces-1" type="range" defaultValue="30" />
      </Field>
      <Field for="range-surfaces-2" label="Brightness" variant="filled">
        <input id="range-surfaces-2" type="range" defaultValue="70" />
      </Field>
    </>
  )
}
