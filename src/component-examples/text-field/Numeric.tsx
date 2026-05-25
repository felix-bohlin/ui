import { TextField } from "opui-css/solid"

export default function Example() {
  return (
    <TextField label="Quantity" type="number" min={0} max={100} step={1} value={1} />
  )
}
