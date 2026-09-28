import { Range } from "opui-css/solid"

export default function Example() {
  return (
    <Range
      label="Invalid Range"
      data-invalid
      endText="This value is incorrect."
    />
  )
}
