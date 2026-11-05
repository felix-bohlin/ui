/** @jsxImportSource @solidjs/web */
import { Chip } from "opui-css/solid"

export default function Disabled() {
  return (
    <>
      <Chip as="button" disabled label="Tonal" variant="tonal" />
      <Chip as="button" disabled label="Outlined" variant="outlined" />
      <Chip disabled href="#" label="Tonal link" />
      <Chip class="ui-disabled" label="Archived" />
    </>
  )
}
