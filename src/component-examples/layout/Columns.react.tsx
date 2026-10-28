import { Card, CardContent } from "opui-css/react"

export default function Columns() {
  return (
    <div className="ui-layout-container">
      <div
        className="ui-layout-columns ui-breakpoint-small"
        style={{ "--_columns": "2fr 1fr" }}
      >
        <Card variant="outlined">
          <CardContent>Content</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Aside</CardContent>
        </Card>
      </div>
    </div>
  )
}
