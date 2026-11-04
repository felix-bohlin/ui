import { Card, CardContent } from "opui-css/react"

export default function Stretch() {
  return (
    <div
      className="ui-layout-grid ui-stretch"
      style={{ "--_min-inline-size": "10rem" }}
    >
      <Card variant="outlined">
        <CardContent>One</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Two</CardContent>
      </Card>
    </div>
  )
}
