import { Card, CardContent } from "opui-css/react"

export default function Sticky() {
  return (
    <div className="ui-layout-container">
      <div
        className="ui-layout-columns ui-breakpoint-small"
        style={{ "--_columns": "15rem 1fr" }}
      >
        <Card className="ui-sticky" variant="tonal">
          <CardContent>Sections</CardContent>
        </Card>
        <div className="ui-layout-column">
          <Card variant="outlined">
            <CardContent>One</CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>Two</CardContent>
          </Card>
          <Card variant="outlined">
            <CardContent>Three</CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
