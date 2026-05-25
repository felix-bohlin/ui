import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <TextField label="With prefix" prefix="$" placeholder="0.00" />
      <TextField label="With suffix" suffix="kg" placeholder="Weight" />
    </>
  )
}
