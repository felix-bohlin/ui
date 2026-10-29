import { Chip } from "opui-css/react"

export default function Pressed() {
  return (
    <>
      <div className="example-row">
        <Chip aria-pressed="true" as="button" variant="outlined" label="All" />
        <Chip
          aria-pressed="false"
          as="button"
          variant="outlined"
          label="Open"
        />
        <Chip
          aria-pressed="false"
          as="button"
          variant="outlined"
          label="Closed"
        />
      </div>
      <div className="example-row">
        <Chip aria-pressed="true" as="button" label="Paid" />
        <Chip aria-pressed="false" as="button" label="Unpaid" />
      </div>
    </>
  )
}
