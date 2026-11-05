import { Card, CardContent } from "opui-css/react"

export default function Stretch() {
  return (
    <div
      className="ui-layout-grid ui-stretch"
      style={{ "--_min-inline-size": "10rem" }}
    >
      <Card variant="outlined">
        <CardContent>Orders: 128</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Returns: 12</CardContent>
      </Card>
    </div>
  )
}
