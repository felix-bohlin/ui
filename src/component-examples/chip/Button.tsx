import { Chip } from "opui-css/solid"

export default function Example() {
  return (
    <div class="example-row">
      <Chip as="button" variant="tonal" label="Tonal button" />
      <Chip as="button" variant="outlined" label="Outlined button" />
    </div>
  )
}
