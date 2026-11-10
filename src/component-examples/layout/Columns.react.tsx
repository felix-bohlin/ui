import { Card, CardContent } from "opui-css/react"

export default function Columns() {
  return (
    <div className="ui-layout-container">
      <div
        className="ui-layout-columns ui-breakpoint-small"
        style={{ "--_columns": "2fr 1fr" }}
      >
        <Card variant="outlined">
          <CardContent>Website relaunch: 12 open tasks</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Due March 14</CardContent>
        </Card>
      </div>
    </div>
  )
}
