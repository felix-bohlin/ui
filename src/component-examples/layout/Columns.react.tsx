import { Card, CardContent } from "opui-css/react"

export default function Columns() {
  return (
    <div className="ui-layout-container">
      <div
        className="ui-layout-columns ui-breakpoint-small"
        style={{ "--_columns": "2fr 1fr" }}
      >
        <Card variant="outlined">
          <CardContent>Summer tour: 12 songs to learn</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>First gig March 14</CardContent>
        </Card>
      </div>
    </div>
  )
}
