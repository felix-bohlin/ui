import { Card, CardContent } from "opui-css/react"

export default function Column() {
  return (
    <div className="ui-l-column">
      <Card variant="outlined">
        <CardContent>First</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Second</CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>Third</CardContent>
      </Card>
    </div>
  )
}
