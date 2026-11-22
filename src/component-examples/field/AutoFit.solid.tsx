/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function AutoFit() {
  return (
    <Field autoFit for="field-auto-fit-1" label="Project name">
      <input id="field-auto-fit-1" placeholder="my-project" />
    </Field>
  )
}
