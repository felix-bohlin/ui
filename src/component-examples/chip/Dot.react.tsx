import { Chip } from "opui-css/react"

export default function Dot() {
  return (
    <>
      <div className="example-row">
        <Chip dot label="Past due" severity="critical" />
        <Chip dot label="Processing" severity="info" />
        <Chip dot label="Refunded" severity="neutral" />
        <Chip dot label="Paid" severity="success" />
        <Chip dot label="Due 15 Oct" severity="warning" />
      </div>

      <div className="example-row">
        <Chip
          dot
          label="Past due"
          severity="critical"
          size="small"
          variant="outlined"
        />
        <Chip
          dot
          label="Processing"
          severity="info"
          size="small"
          variant="outlined"
        />
        <Chip
          dot
          label="Refunded"
          severity="neutral"
          size="small"
          variant="outlined"
        />
        <Chip
          dot
          label="Paid"
          severity="success"
          size="small"
          variant="outlined"
        />
        <Chip
          dot
          label="Due 15 Oct"
          severity="warning"
          size="small"
          variant="outlined"
        />
      </div>
    </>
  )
}
