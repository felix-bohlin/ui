import { Field } from "opui-css/react"

export default function AutoFit() {
  return (
    <Field autoFit htmlFor="field-auto-fit-1" label="Project name">
      <input id="field-auto-fit-1" placeholder="my-project" />
    </Field>
  )
}
