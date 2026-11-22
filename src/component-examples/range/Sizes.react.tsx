import { Field } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Field htmlFor="range-sizes-1" label="X-small" size="x-small">
        <input id="range-sizes-1" type="range" />
      </Field>
      <Field htmlFor="range-sizes-2" label="Small" size="small">
        <input id="range-sizes-2" type="range" />
      </Field>
      <Field htmlFor="range-sizes-3" label="Medium">
        <input id="range-sizes-3" type="range" />
      </Field>
      <Field htmlFor="range-sizes-4" label="Large" size="large">
        <input id="range-sizes-4" type="range" />
      </Field>
    </>
  )
}
