import { Chip } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Chip as="button" disabled label="Tonal" variant="tonal" />
      <Chip as="button" disabled label="Outlined" variant="outlined" />
      <Chip disabled href="#" label="Tonal link" />
      <Chip className="ui-disabled" label="Archived" />
    </>
  )
}
