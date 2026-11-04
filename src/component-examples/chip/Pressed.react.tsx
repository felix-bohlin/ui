import { Chip } from "opui-css/react"

export default function Pressed() {
  return (
    <>
      <div className="example-row">
        <Chip aria-pressed="true" as="button" label="All" variant="outlined" />
        <Chip
          aria-pressed="false"
          as="button"
          label="Open"
          variant="outlined"
        />
        <Chip
          aria-pressed="false"
          as="button"
          label="Closed"
          variant="outlined"
        />
      </div>
      <div className="example-row">
        <Chip aria-pressed="true" as="button" label="Paid" />
        <Chip aria-pressed="false" as="button" label="Unpaid" />
      </div>
    </>
  )
}
