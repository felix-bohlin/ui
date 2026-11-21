import { TextField } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <TextField htmlFor="text-field-sizes-1" label="X-small" size="x-small">
        <input id="text-field-sizes-1" placeholder="Your name" />
      </TextField>
      <TextField htmlFor="text-field-sizes-2" label="Small" size="small">
        <input id="text-field-sizes-2" placeholder="Your name" />
      </TextField>
      <TextField htmlFor="text-field-sizes-3" label="Medium">
        <input id="text-field-sizes-3" placeholder="Your name" />
      </TextField>
      <TextField htmlFor="text-field-sizes-4" label="Large" size="large">
        <input id="text-field-sizes-4" placeholder="Your name" />
      </TextField>
    </>
  )
}
